import React from "react";
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Fa } from "mdbreact";
import "./style.css";

class NavbarPage extends React.Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => this.setState({ isOpen: !this.state.isOpen });

  refresh = () => {
    window.location.reload()
  }

  render() {
    return (
      <Navbar color="default-color" dark expand="md" style={{ marginTop: "20px" }}>
        <NavbarBrand className="pointer" href="/" onClick={this.refresh}>
          <strong className="white-text">RPS Game</strong>
        </NavbarBrand>
        <NavbarToggler
          onClick={this.toggleCollapse}
        />
        <Collapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <NavbarNav left>
          </NavbarNav>
          <NavbarNav right>
            <NavItem>
              <NavLink className="waves-effect waves-light pointer" to="/Leader_Board" onClick={this.refresh}>
                Leader Board
                </NavLink>
            </NavItem>
            <NavItem>
              <Dropdown>
                <DropdownToggle nav caret>
                  Account <Fa icon="user" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-default" right>
                  <DropdownItem href="/Login">Sign In</DropdownItem>
                  <DropdownItem href="/SignUp">Sign Up</DropdownItem>
                  <DropdownItem href="/Signout">Sign Out</DropdownItem>
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