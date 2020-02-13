import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, Spinner,
   DropdownItem, UncontrolledAlert  } from 'reactstrap';

const appendedURL = "api/json";
var username = "james";
var password = "curley";
const proxyurl = "http://cors-anywhere.herokuapp.com/";
var queueUrl;
var requestBuildUrl;
var requestQueueUrl;
var requestJobResult;
var buildUrl = '';
var jobResult;

const CheckForUpdates = (props) => {
  const { sourceToUpdate, onSuccess } = props

  var triggerBuildApi = "http://206.189.165.104:8080/view/All/job/run_web_scrapers_test/buildWithParameters?SCRAPER_SOURCE=" + sourceToUpdate + "&token=g44ygrf696fywo74ehfbkyfy66";
  var headers = new Headers();
  
  function displayFailureAlert() {
    console.log("in alert function");
    return (
      <div>
        <UncontrolledAlert color="info">
          Problem Checking for updates, Please try again!
        </UncontrolledAlert>
      </div>
    );
  }

    async function triggerJenkinsBuild() {
      headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
      requestQueueUrl = await fetch(proxyurl + triggerBuildApi, {
        method: 'GET',
        headers: headers})
        .then(
          function (getQueueUrl) {
            queueUrl = getQueueUrl.headers.get('location') + appendedURL;
            console.log(queueUrl)})
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
          });
      getBuildUrl();
    }
    

    async function getBuildUrl() {
      requestBuildUrl = await fetch(proxyurl + queueUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}})
      .then (function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
          }
        response.json().then(function(data) {console.log(data.why)
        if(data.why !== null) { 
          setTimeout(() => { getBuildUrl(); }, 1500);
        } else {
            buildUrl = data.executable.url + appendedURL
            console.log(buildUrl)
            getJobResult(buildUrl)
        }})
      })
    .catch(function(err) {
    console.log('Fetch Error :-S', err);
    });}
  
    async function getJobResult() {
      requestJobResult = await fetch(proxyurl + buildUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }})
      .then (
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        response.json().then(function(data) {
          // console.log(data.result)
          jobResult = data.result;
          if (jobResult === 'FAILURE'){
            console.log(jobResult)
            displayFailureAlert();
          } else {
            console.log("SUCCESS - Calling Component");
            if(sourceToUpdate === "BLABBERMOUTH") {
              console.log("callback BLABBERMOUTH")
              setTimeout(function(){}, 2000);
              onSuccess();
            } else {
              console.log("callback DME")
              setTimeout(function(){}, 1000);
              onSuccess();
            }
          }
        });
      })
    await Promise.all([requestQueueUrl, requestBuildUrl, requestJobResult])   
  }

  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown className="float-right" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Check for Updates
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <div onClick={() => triggerJenkinsBuild()}>
            This page
          </div>
        </DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default CheckForUpdates;


  // var getTimeReq = new XMLHttpRequest();
  // getTimeReq.open('GET', document.location, false);
  // getTimeReq.send(null);
  // var timeLastUpdated = getTimeReq.getResponseHeader('Date');
  // console.log(timeLastUpdated);