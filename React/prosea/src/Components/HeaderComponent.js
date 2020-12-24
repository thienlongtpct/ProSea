import React, {Component} from "react";
import "../CSS/Header.css";
import {Nav, Navbar, Image} from "react-bootstrap";
import Register from "./RegisterComponent";
import Login from "./LoginComponent";
import SearchUser from "./SearchUserComponent";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginOpen: false,
            registerOpen: false
        }
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleRegister = this.toggleRegister.bind(this);
        this.toggleLogout = this.toggleLogout.bind(this);
    }

    toggleLogin() {
        this.setState({loginOpen: !this.state.loginOpen});
    }

    toggleRegister() {
        this.setState({registerOpen: !this.state.registerOpen});
    }

    toggleLogout() {
        localStorage.setItem("user", null);
        window.location.reload();
    }

    render() {
        let authUser = JSON.parse(localStorage.getItem("user"));
        return(
            <>
                <div className="w-100 header my-color">
                    <Navbar as="nav" className="py-0 px-3">
                        <Navbar.Brand href="/"><Image src="/Images/logo.png" className="logo"/></Navbar.Brand>
                        <Navbar.Collapse>
                            <SearchUser/>
                            {authUser !== null ?
                                <Nav as="ul" className="ml-auto">
                                    <Nav.Link href="/" className="circle-icon mr-2"><i className="fas fa-home"/></Nav.Link>
                                    <Nav.Link href={authUser.username} className="circle-icon mr-2"><i className="fas fa-user"/></Nav.Link>
                                    {/*<Nav.Link className="circle-icon mr-2"><i className="fas fa-comments"/></Nav.Link>*/}
                                    <Nav.Link onClick={() => window.location = "http://localhost:3000/"+authUser.username+"/join-request"} className="circle-icon mr-2"><i className="fas fa-bell"/></Nav.Link>
                                    <Nav.Link onClick={this.toggleLogout} className="circle-icon"><i className="fas fa-sign-out-alt"/></Nav.Link>
                                </Nav> :
                                <Nav as="ul" className="ml-auto">
                                    <Nav.Link href="/" className="circle-icon mr-2"><i className="fas fa-home"/></Nav.Link>
                                    <Nav.Link onClick={this.toggleLogin} className="circle-icon mr-2"><i className="fas fa-sign-in-alt"/></Nav.Link>
                                    <Nav.Link onClick={this.toggleRegister} className="circle-icon"><i className="fas fa-user-plus"/></Nav.Link>
                                </Nav>
                            }
                        </Navbar.Collapse>
                    </Navbar>
                    {this.state.loginOpen ? <Login toggle={this.toggleLogin}/> : <></>}
                    {this.state.registerOpen ? <Register toggle={this.toggleRegister}/> : <></>}
                </div>
            </>
        )
    }
}

export default Header;