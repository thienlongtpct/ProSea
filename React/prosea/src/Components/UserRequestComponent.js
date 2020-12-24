import React, {Component} from "react";

import {Col, Container, Row} from "react-bootstrap";
import {connect} from "react-redux";

import Navigation from "./NavigationConponent";
import Requests from "./RequestsComponent";
import RequestType from "./RequestTypeComponent";

import "../CSS/Request.css";

const mapStoreToProps = state => {
    return {
        user: state.user.user
    }
}

class UserRequest extends Component {
    constructor(props) {
        super(props);
        this.changeType = this.changeType.bind(this);
    }

    changeType() {

    }

    render() {
        return (
            <>
                <Navigation navItems={this.props.navItems} activeItem="join-request"/>
                <Container className="max-screen pb-5">
                    <Row style={{marginLeft: "-0.75rem", marginRight: "-0.75rem"}}>
                        <Col md="5" lg="4" style={{padding: "0 0.75rem"}}>
                            <RequestType changeType={this.changeType} type={this.props.user.type}/>
                        </Col>
                        <Col md="7" lg="8" style={{padding: "0 0.75rem"}}>
                            <Requests/>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default connect(mapStoreToProps, null)(UserRequest);