import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";

import Contact from "./ContactComponent";
import Navigation from "./NavigationConponent";
import Profile from "./ProfileComponent";
import "../CSS/Profile.css";

class UserProfile extends Component {
    render() {
        return (
            <>
                <Navigation navItems={this.props.navItems} activeItem="profile"/>
                <Container className="max-screen pb-5">
                    <Row style={{marginLeft: "-0.75rem", marginRight: "-0.75rem"}}>
                        <Col md="5" lg="4" style={{padding: "0 0.75rem"}}>
                            <Contact/>
                        </Col>
                        <Col md="7" lg="8" style={{padding: "0 0.75rem"}}>
                            <Profile/>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default UserProfile;