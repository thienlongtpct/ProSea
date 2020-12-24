import React, {Component} from "react";

import {Form, Button, Modal, Row, Container, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import {connect} from "react-redux";
import Switch from "react-switch";
import {register} from "../Redux/ActionCreators";
import {registerValidatorsDefault, registerValidators} from "../Resources/RegisterValidators";
import {validate} from "../Resources/Validate";

const mapDispatchToProps = dispatch => {
    return {
        register: (user, isCompany) => {dispatch(register(user, isCompany))}
    }
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            developer: true,
            username: '',
            email: '',
            password: '',
            validators: registerValidatorsDefault
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        let validator = registerValidators[fieldName];
        if (registerValidators.hasOwnProperty(fieldName)) {
            this.setState({
                [fieldName]: fieldValue,
                validators: {
                    ...this.state.validators,
                    [fieldName]: validate(fieldValue, validator)
                }
            });
        }
    }

    handleSwitch() {
        this.setState({developer: !this.state.developer});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.register(this.state, this.state.developer);
    }

    render() {
        const renderTooltip = (message) => (
            <Tooltip>
                {message}
            </Tooltip>
        );

        let allCorrect = true;
        let validators = this.state.validators;

        for (let key in validators) {
            if (validators.hasOwnProperty(key)) {
                allCorrect &= validators[key].validate;
            }
        }

        return (
            <Modal show={true} onHide={this.props.toggle} keyboard={true}>
                <Modal.Body className="p-4 m-2">
                    <h4 className="mb-3">Register</h4>
                    <Container>
                        <Form onSubmit={this.handleSubmit} method="POST">
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Row>
                                    <Col md={11}>
                                        <Form.Control type="text" name="username" placeholder="Username"
                                                      onChange={this.handleChange}/>
                                    </Col>
                                    <Col md={1} className="pt-2" style={{
                                        display: "flex",
                                        justifyContent: "center"
                                    }}>
                                        <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }}
                                                        overlay={renderTooltip(validators.username.message)}O>
                                            {validators.username.validate ?
                                                    <i className="fas fa-check-circle"
                                                       style={{color: "#009432", maxHeight: "16px"}}/> :
                                                    <i className="fas fa-exclamation-triangle"
                                                       style={{color: "#C23616", maxHeight: "16px"}}/>
                                            }
                                        </OverlayTrigger>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Row>
                                    <Col md={11}>
                                        <Form.Control type="email" name="email" placeholder="Email"
                                                      onChange={this.handleChange}/>
                                    </Col>
                                    <Col md={1} className="pt-2" style={{
                                        display: "flex",
                                        justifyContent: "center"
                                    }}>
                                        <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }}
                                                        overlay={renderTooltip(validators.email.message)}>
                                            {validators.email.validate ?
                                                <i className="fas fa-check-circle"
                                                   style={{color: "#009432", maxHeight: "16px"}}/> :
                                                <i className="fas fa-exclamation-triangle"
                                                   style={{color: "#C23616", maxHeight: "16px"}}/>
                                            }
                                        </OverlayTrigger>
                                    </Col>
                                </Row>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Row>
                                    <Col md={11}>
                                        <Form.Control type="password" name="password" placeholder="Password"
                                                      onChange={this.handleChange}/>
                                    </Col>
                                    <Col md={1} className="pt-2" style={{
                                        display: "flex",
                                        justifyContent: "center"
                                    }}>
                                        <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }}
                                                        overlay={renderTooltip(validators.password.message)}>
                                            {validators.password.validate ?
                                                <i className="fas fa-check-circle"
                                                   style={{color: "#009432", maxHeight: "16px"}}/> :
                                                <i className="fas fa-exclamation-triangle"
                                                   style={{color: "#C23616", maxHeight: "16px"}}/>
                                            }
                                        </OverlayTrigger>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group as={Row} className="m-0 mb-3">
                                <Form.Label>Company Account</Form.Label>
                                <Switch onChange={this.handleSwitch} checked={!this.state.developer}
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={20}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 3px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={15}
                                        width={48}
                                        className="ml-auto"/>
                            </Form.Group>
                            <Row className="justify-content-end mt-4 px-3">
                                <Button type="button" className="btn btn-gray rounded mr-2" onClick={this.props.toggle}>Cancel</Button>
                                <Button type={allCorrect ? "submit" : "button"} className={"btn btn-blue rounded"+allCorrect ? "" : " disabled"}>Register</Button>
                            </Row>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
        );
    }
}

export default connect(null, mapDispatchToProps)(Register);