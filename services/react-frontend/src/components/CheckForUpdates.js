import React, { useState } from "react";
import { Button } from "reactstrap";

const APPENDED_URL = "api/json";
const JENKINS_USER = "james";
const JENKINS_PWORD = "curley";
const PROXY_URL = "http://cors-anywhere.herokuapp.com/";
const JENKINS_TOKEN = "g44ygrf696fywo74ehfbkyfy66";
const JENKINS_HOST = "http://206.189.165.104:8080/";

const CheckForUpdates = props => {
  const { sourceToUpdate, onSuccess, setLoading, setOpen, setOpenFailed } = props;
  const [ disableButton, setDisableButton ] = useState();

  var triggerBuildApi = PROXY_URL + JENKINS_HOST +
    "view/All/job/run_web_scrapers_test/buildWithParameters?SCRAPER_SOURCE=" +
    sourceToUpdate + "&token=" + JENKINS_TOKEN;

  var headers = new Headers();
  headers.append("Authorization", "Basic " + btoa(JENKINS_USER + ":" + JENKINS_PWORD));

  async function triggerJenkinsBuild() {
    setLoading(true);
    setDisableButton(!disableButton);
    
    try {
      const response = await fetch( triggerBuildApi, {
        method: "POST",
        headers: headers
      })
      if (response.status !== 201) {
          console.log("Problem triggerring job. Status Code: " + response.status);
          setLoading(false);
          setDisableButton(disableButton);
          setOpenFailed(true)
      } else {
        var queueUrl = await response.headers.get("location") + APPENDED_URL;
        console.log(queueUrl);
      }
    } catch(error) {
      console.log("Fetch Error :-S", error);
      setLoading(false);
      setDisableButton(disableButton);
      setOpenFailed(true)
    };
    getBuildUrl(queueUrl);
  }

  async function getBuildUrl(queueUrl) {
    try{
      const response = await fetch(PROXY_URL + queueUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })
      const data = await response.json();
      console.log(data.why)
      if (data.why !== null) {
        setTimeout(() => {
          getBuildUrl(queueUrl);
        }, 1000);
      } else {
        var buildUrl = data.executable.url + APPENDED_URL;
        console.log(buildUrl);
        getJobResult(buildUrl);
      }
    } catch(error) {
      console.log("Fetch Error :-S", error);
      setDisableButton(disableButton);
      setLoading(false);
      setOpenFailed(true)
    };
  }

  async function getJobResult(buildUrl) {
    try {
      const response = await fetch(PROXY_URL + buildUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })
      const data = await response.json();
      if(response.status !== 200) {
        console.log("Problem fetching build url. Status Code: " + response.status);
        return;
      }
      var jobResult = data.result;
      console.log(jobResult)
      processJobResult(buildUrl, jobResult)

    } catch(error) {
      console.log("Fetch Error :-S", error);
      setDisableButton(disableButton);
      setLoading(false);
      setOpenFailed(true)
  }
}

  function processJobResult(buildUrl, jobResult) {
    console.log("In processJobRes func: ", jobResult)

      if(jobResult === null) {
        console.log("NULL?: ", jobResult)
        setTimeout(() => {
          getJobResult(buildUrl);
        }, 1000);
      }

      if (jobResult === "FAILURE") {
        console.log("if Failure: ", jobResult)
        setDisableButton(disableButton);
        setLoading(false);
        setOpenFailed(true);
      }

      if(jobResult === "SUCCESS") {
        console.log("if Success: ", jobResult);
        setLoading(false);
        setOpen(true);
        setDisableButton(disableButton);
        onSuccess();
      }
  }    

  return (
    <Button className="float-right" disabled={disableButton} toggle={"toggle"} color="success" size="m" onClick={() => triggerJenkinsBuild()}>Check for Updates</Button>
  );
};

export default CheckForUpdates;
