import React from "react";
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem, Fa } from "mdbreact";
import API from "../../utils/API"

class NavbarPage extends React.Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => this.setState({ isOpen: !this.state.isOpen });

  logout = () =>  {
    console.log("clicked")
   API.logout()
   .then(window.location.href = "/")
   .catch(err => console.log(err));
 }

  render() {
    return (
      <Navbar color="default-color" dark expand="md" style={{marginTop: "20px"}}>
          <NavbarBrand>
            <strong className="white-text">Online RPS</strong>
          </NavbarBrand>
          <NavbarToggler
            onClick={this.toggleCollapse}
          />
          <Collapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <NavbarNav left>
              <NavItem>
                <NavLink to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/RPS">RPS</NavLink>
              </NavItem>
            </NavbarNav>
            <NavbarNav right>
              <NavItem>
                <NavLink className="waves-effect waves-light" to="/Leader_Board">Leader Board</NavLink>
              </NavItem>
              <NavItem>
                <Dropdown>
                  <DropdownToggle nav caret>
                    <Fa icon="user" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-default" right>
                    <DropdownItem href="/Login">Login</DropdownItem>
                    <DropdownItem href="/SignUp">Sign up</DropdownItem>
                    <DropdownItem href="/Logout">Log Out</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
            </NavbarNav>
          </Collapse>
      </Navbar>
    );
  }
}

export default NavbarPage;