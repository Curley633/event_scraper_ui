import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { DMEEvents } from '../DME/DMEEvents';

const appendedURL = "api/json";
var username = "james";
var password = "curley";
const proxyurl = "http://cors-anywhere.herokuapp.com/";
var queueUrl;
var buildUrlReq;
var buildUrl = ''
// var resultRequest;
// var getJobResult
var jobResult;

const CheckForUpdates = (props) => {
  const {
    sourceToUpdate = "DME"
  } = props

  var triggerBuildApi = "http://206.189.165.104:8080/view/All/job/run_web_scrapers_test/buildWithParameters?SCRAPER_SOURCE=" + sourceToUpdate + "&token=g44ygrf696fywo74ehfbkyfy66";
  var headers = new Headers();

  const triggerJenkinsBuild = async() => {

    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

    const p1 = await fetch(proxyurl + triggerBuildApi, {
      method: 'GET',
      headers: headers})
      .then(
        function (getQueueUrl) {
          queueUrl = getQueueUrl.headers.get('location')
          console.log(queueUrl + appendedURL)
      })
      .then(
      
      async function getBuildUrl() {
        buildUrlReq = await fetch(proxyurl + queueUrl + appendedURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'}})
        .then (
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          response.json().then(function(data) {
            console.log(data.why)

            if(data.why !== null) {
              setTimeout(() => { getBuildUrl(); }, 1500);
            } else {
              buildUrl = data.executable.url + appendedURL
              console.log(buildUrl)
              getJobResult(buildUrl)
            }
          })
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    })
    console.log(buildUrl)
    const getJobResult = async() => {
      console.log(buildUrl)
      await fetch(proxyurl + buildUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }})
        .then (
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          response.json().then(function(data) {
            console.log(data.result)
          });
        }
      )   
        await Promise.all([p1, buildUrlReq, getJobResult])
  }
  return jobResult;
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
            {(() => {
            if (jobResult == "SUCCESS") {
              console.log("Calling DME Component")
              return <DMEEvents/>;
            }
          })()}
          </div>
          {/* <div>
          
        </div> */}
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <div onClick = {() => triggerJenkinsBuild()}>
            All pages
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