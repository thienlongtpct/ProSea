import React, {Component} from "react";

import {Form, Button, Modal, Row} from "react-bootstrap";
import {login} from "../Redux/ActionCreators";
import {connect} from "react-redux";

const mapDispatchToProps = dispatch => {
    return {
        login: (user) => {dispatch(login(user))}
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        this.setState({[fieldName]: fieldValue});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.login(this.state);
    }

    render() {
        return (
            <Modal show={true} onHide={this.props.toggle} keyboard={true}>
                <Modal.Body className="p-4 m-2">
                    <h4 className="mb-3">Login</h4>
                    <Form onSubmit={this.handleSubmit} method="POST">
                        <Form.Group key="1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Username"
                                          onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group key="3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password"
                                          onChange={this.handleChange}/>
                        </Form.Group>
                        <Row className="justify-content-end mt-4 px-3">
                            <Button type="button" className="btn btn-gray rounded mr-2" onClick={this.props.toggle}>Cancel</Button>
                            <Button type="submit" className="btn btn-blue rounded">Login</Button>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default connect(null, mapDispatchToProps)(Login);