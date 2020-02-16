import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledAlert
} from "reactstrap";

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
  const { sourceToUpdate, onSuccess, setLoading } = props;
  console.log('setLoading', setLoading);

  var triggerBuildApi =
    "http://206.189.165.104:8080/view/All/job/run_web_scrapers_test/buildWithParameters?SCRAPER_SOURCE=" +
    sourceToUpdate +
    "&token=g44ygrf696fywo74ehfbkyfy66";
  var headers = new Headers();

  // function displayFailureAlert() {
  //   console.log("in alert function");
  //   return (
  //     <div>
  //       <UncontrolledAlert color="info">
  //         Problem Checking for updates, Please try again!
  //       </UncontrolledAlert>
  //     </div>
  //   );
  // }
  async function triggerJenkinsBuild() {
    setLoading(true);

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
        setLoading(false);
      });
  }

  async function getJobResult() {
    console.log('setLoading', setLoading);

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
        // console.log(data.result)
        jobResult = data.result;
        if (jobResult === "FAILURE") {
          console.log(jobResult);
          // displayFailureAlert();
        } else {
          if (sourceToUpdate === "BLABBERMOUTH") {
            count++;
            if (count <= 2) {
              console.log("callback BLABBERMOUTH");
              setTimeout(() => {
                getJobResult();
              }, 5000);
              console.log("BM timer done");
            }
            console.log("SUCCESS - Calling Component");
            onSuccess();
          } else {
            count++;
            if (count <= 1) {
              console.log("callback to allow PG to update");
              setTimeout(() => {
                getJobResult();
              }, 1000);
              console.log("DME timer done");
            }
            console.log("SUCCESS - Calling Component");
            onSuccess();
          }
        }
      });
    });
    await Promise.all([requestQueueUrl, requestBuildUrl, requestJobResult]);
    setLoading(false);
  }

  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown
      className="float-right"
      isOpen={dropdownOpen}
      toggle={toggle}
    >
      <DropdownToggle caret>Check for Updates</DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <div onClick={() => triggerJenkinsBuild()}>This page</div>
        </DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default CheckForUpdates;
