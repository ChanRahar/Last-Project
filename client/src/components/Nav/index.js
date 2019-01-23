import React from "react";
import { Navbar, MDBIcon, NavbarBrand, NavbarNav, MDBDropdownItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, NavItem, NavLink, NavbarToggler, Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Fa } from "mdbreact";
import "./style.css";
import API from "../../utils/API"

const styles = {
  sideNav: {
    color:"white"
  },
  bar:{
    size:"23px"
  }
}

class NavbarPage extends React.Component {
  state = {
    isOpen: false,
    sideOpen: false,
  };

  componentDidMount() {

    // Check session data to see if user should be logged in
    API.signedIn()
      .then(response => {
        console.log(response);
        if (response.data.loggedIn) {
          this.setState({ loggedIn: true, username: response.data.username });
        } else {
          console.log("No logged in user stored in session");
        }
      });
  }

  handleToggle = () => {
    this.setState({
      sideOpen: !this.state.sideOpen
    });
  };

  toggleCollapse = () => this.setState({ isOpen: !this.state.isOpen });

  refresh = () => {
    window.location.reload()
  }

  render() {
    return (
      <Navbar color="default-color" dark expand="md">

        <MDBDropdown size="lg">
          <MDBDropdownToggle nav style={styles.sideNav}>
            <span style={styles.bar}>&#9776;</span>
          </MDBDropdownToggle>
          <MDBDropdownMenu basic>
            <MDBDropdownItem href="/RPS">RPS vs CPU</MDBDropdownItem>
            <MDBDropdownItem href="/RPS_Online">RPS Online</MDBDropdownItem>
            <MDBDropdownItem href="/RPS">RPSLS vs CPU</MDBDropdownItem>
            <MDBDropdownItem href="/RPSLS_Online">RPSLS Online</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>

      
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
              {this.state.loggedIn === true ?
                (<Dropdown>
                  <DropdownToggle nav caret>
                    {this.state.username} <Fa icon="user" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-default" right>
                    <DropdownItem href="/SignOut">Sign Out</DropdownItem>
                  </DropdownMenu>
                </Dropdown>) :
                (<Dropdown>
                  <DropdownToggle nav caret>
                    Account <Fa icon="user" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-default" right>
                    <DropdownItem href="/Login">Sign In</DropdownItem>
                  </DropdownMenu>
                </Dropdown>)}
            </NavItem>
          </NavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavbarPage;