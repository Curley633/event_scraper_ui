import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

var username = "james"
var password = "curley"
const proxyurl = "https://cors-anywhere.herokuapp.com/";

const searchLatest = "http://206.189.165.104:8080/view/All/job/run_web_scrapers_test/buildWithParameters?SCRAPER_SOURCE=BLABBERMOUTH&token=g44ygrf696fywo74ehfbkyfy66";
var headers = new Headers();

const CheckForUpdates = (props) => {
  const {
    sourceToUpdate
  } = props
  
function triggerJenkinsBuild() {
  headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
  fetch(proxyurl + searchLatest, {headers: headers}, {
    method: 'GET'})
  .catch(err => console.log(err))

  // var getTimeReq = new XMLHttpRequest();
  // getTimeReq.open('GET', document.location, false);
  // getTimeReq.send(null);
  // var timeLastUpdated = getTimeReq.getResponseHeader('Date');
  // console.log(timeLastUpdated);
  }

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown className="float-right" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Update
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <div onClick={() => triggerJenkinsBuild()}>
            DME
          </div>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem href='/'>Home</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default CheckForUpdates;