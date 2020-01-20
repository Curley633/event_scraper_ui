import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  a, .navbar {
    background-color: #222;

    &:hover {
      color: white;
  }

  a, .navbar-nav span[role=button] {
    padding: 10px;
    display: inline-block;
    line-height: 10px;
    color: #bbb;

    %:hover {
      color: white;
      text-decoration: none;
    }
  }
  
  a, .navbar-brand, .navbar-nav .nav-link .nav-item {
    color: #bbb;

    &:hover {
      color: white;
      text-decoration: none;
    }

  }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">Irish Metal Hub</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item componentclass='span'>
            <Link to="/">Home</Link>
          </Nav.Item>
          <Nav.Item componentclass='span'>
            <Link to="/about">About</Link>
          </Nav.Item>
          <Nav.Item componentclass='span'>
            <Link to="/contact">Contact</Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles >
)