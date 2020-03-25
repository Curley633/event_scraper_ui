import React, { useState } from "react";
import { Button } from "reactstrap";

const appendedURL = "api/json";
const username = "james";
const password = "curley";
const proxyurl = "http://cors-anywhere.herokuapp.com/";
var queueUrl;
var requestBuildUrl;
var requestQueueUrl;
var requestJobResult;
var buildUrl = "";
var jobResult;
var count = 0;

const CheckForUpdates = props => {
  const { sourceToUpdate, onSuccess, setLoading, setOpen, setOpenFailed } = props;
  const [ disableButton, setDisableButton ] = useState(true);

  var triggerBuildApi =
    "http://206.189.165.104:8080/view/All/job/run_web_scrapers_test/buildWithParameters?SCRAPER_SOURCE=" +
    sourceToUpdate +
    "&token=g44ygrf696fywo74ehfbkyfy66";
  var headers = new Headers();

  async function triggerJenkinsBuild() {
    setLoading(true);
    setDisableButton(!disableButton);

    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
      (requestQueueUrl = await fetch(proxyurl + triggerBuildApi, {
        method: "GET",
        headers: headers
      })
        .then(function(getQueueUrl) {
          queueUrl = getQueueUrl.headers.get("location") + appendedURL;
          console.log(queueUrl);
        })
        .catch(function(err) {
          console.log("Fetch Error :-S", err);
          setLoading(false);
          setDisableButton(disableButton);
        }));
    getBuildUrl();
  }

  async function getBuildUrl() {
    requestBuildUrl = await fetch(proxyurl + queueUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    .then(function(response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
      response.json().then(function(data) {
        console.log(data.why);
        if (data.why !== null) {
          setTimeout(() => {
            getBuildUrl();
          }, 1500);
        } else {
          buildUrl = data.executable.url + appendedURL;
          console.log(buildUrl);
          getJobResult();
        }
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
      setDisableButton(disableButton);
      setLoading(false);
    });
  }

  async function getJobResult() {
    requestJobResult = await fetch(proxyurl + buildUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }).then(function(response) {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
      response.json().then(function(data) {
        console.log("Data.Result: ", data.result)
        jobResult = data.result;
        if (jobResult === "FAILURE") {
          console.log("Result: ", jobResult);
          setDisableButton(disableButton);
          setLoading(false);
          setOpenFailed(true);
          return;
        } else {
          if (sourceToUpdate === "BLABBERMOUTH" || sourceToUpdate === "METALCELL" || sourceToUpdate === "ALL") {
            console.log("Detecting BM/MetalCell/ALL");
            count++;
            if (count <= 2) {
              console.log("callback BLABBERMOUTH or METALCELL");
              setTimeout(() => {
                getJobResult();
              }, 5000);
              console.log("BM timer done");
            } else {
            console.log("SUCCESS - Calling Component");
            setLoading(false);
            setOpen(true);
            setDisableButton(disableButton);
            if(sourceToUpdate === "ALL") {
              return;
            } else {
            onSuccess();
            return;
            }}
          } else {
            count++;
            if (count <= 1) {
              console.log("callback to allow PG to update");
              setTimeout(() => {
                getJobResult();
              }, 1000);
              console.log("DME timer done");
            } else {
              console.log("SUCCESS - Calling Component", count);
              setLoading(false);
              setOpen(true);
              setDisableButton(disableButton);
              onSuccess();
            }
          }
        }});
      });
    await Promise.all([requestQueueUrl, requestBuildUrl, requestJobResult]);
  }

  return (
    <Button className="float-right" disabled={!disableButton} toggle={"toggle"} color="success" size="m" onClick={() => triggerJenkinsBuild()}>Check for Updates</Button>
  );
};

export default CheckForUpdates;