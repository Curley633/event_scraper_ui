import React, { useState } from "react";
import { Button } from "reactstrap";
require('dotenv').config();

const APPENDED_URL = "api/json";

const CheckForUpdates = props => {
  const { sourceToUpdate, onSuccess, setLoading, setOpen, setOpenFailed } = props;
  const [ disableButton, setDisableButton ] = useState();

  var triggerBuildApi = process.env.REACT_APP_PROXY_URL + process.env.REACT_APP_JENKINS_HOST +
    "view/All/job/run_web_scrapers_test/buildWithParameters?SCRAPER_SOURCE=" +
    sourceToUpdate + "&token=" + process.env.REACT_APP_JENKINS_TOKEN;

  var headers = new Headers();
  headers.append("Authorization", "Basic " + btoa(process.env.REACT_APP_JENKINS_USER + ":" + process.env.REACT_APP_JENKINS_PWORD));

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
      const response = await fetch(process.env.REACT_APP_PROXY_URL + queueUrl, {
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
      const response = await fetch(process.env.REACT_APP_PROXY_URL + buildUrl, {
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
