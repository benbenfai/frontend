import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,} from 'reactstrap';

class NNavbar extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    render(){
        return(
            <Navbar color="light" light expand="lg">
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                <Nav style={{fontSize: '24px'}}>
                    <NavItem><NavLink exact to="/">Home</NavLink></NavItem>
                    <NavItem><NavLink to="/test">Test</NavLink></NavItem>
                    <NavItem><NavLink to="/login">Login</NavLink></NavItem>
                    <NavItem><NavLink to="/signup">signup</NavLink></NavItem>
                </Nav>
                </Collapse>
            </Navbar>
        );
    }
}
export default NNavbar;