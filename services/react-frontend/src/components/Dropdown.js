import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Dropdown = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Select
      </DropdownToggle>
      <DropdownMenu align="left">
        <DropdownItem href='/dme'>DME</DropdownItem>
        <DropdownItem href='/ticketmaster'>Ticketmaster</DropdownItem>
        <DropdownItem href='/blabbermouth'>Blabbermouth</DropdownItem>
        <DropdownItem href='/metalcell'>The Metal Cell</DropdownItem>
        <DropdownItem divider />
        <DropdownItem href='/'>Home</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default Dropdown;