import React, {Component} from "react";
import {Row, Col, Form, Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {editUser} from "../Redux/ActionCreators";
import {connect} from "react-redux";
import Editable from "./EditableComponent";
import {profileValidators} from "../Resources/ProfileValidators";
import {validate} from "../Resources/Validate";

const mapStoreToProps = state => {
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editUser: (user, reload) => {dispatch(editUser(user, reload))}
    }
};

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.user,
            repeatedPassword: this.props.user.password,
            editMode: false,
            validators: {
                email: validate(this.props.user.email, profileValidators.email),
                name: validate(this.props.user.name, profileValidators.name),
                password: validate(this.props.user.password, profileValidators.password),
                repeatedPassword: {validate: true, message: "Looks good!"},
                bio: validate(this.props.user.bio, profileValidators.bio)
            }
        };
        this.initialState = this.state;
        this.toggleMode = this.toggleMode.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        window.scrollTo(0,0);
    }

    toggleMode() {
        this.setState({
            ...this.initialState,
            editMode: !this.state.editMode
        });
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        let validator = profileValidators[fieldName];
        if (profileValidators.hasOwnProperty(fieldName)) {
            this.setState({
                [fieldName]: fieldValue,
                validators: {
                    ...this.state.validators,
                    [fieldName]: validate(fieldValue, validator)
                }
            }, () =>
                this.setState({
                    validators: {
                        ...this.state.validators,
                        repeatedPassword: {
                            validate: this.state.password === this.state.repeatedPassword,
                            message: this.state.password === this.state.repeatedPassword ?
                                "Looks good!" : "The password is not match"
                        }}
                }));
        }
        else
            this.setState({[fieldName]: fieldValue}, () =>
                this.setState({
                    validators: {
                        ...this.state.validators,
                        repeatedPassword: {
                            validate: this.state.password === this.state.repeatedPassword,
                            message: this.state.password === this.state.repeatedPassword ?
                                "Looks good!" : "The password is not match"
                        }
                    }
                })
            );
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.editUser(this.state, true);
    }

    render() {
        let authUser = JSON.parse(localStorage.getItem("user"));
        let isOwner = authUser && this.props.user.username === authUser.username;
        let editMode = this.state.editMode;

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
            <div className="rounded-10 bg-white p-5 p-md-4 p-lg-5 profile">
                <h3 className="mb-4">Personal Information</h3>
                <Form onSubmit={this.handleSubmit} className="mx-4" method="PUT">
                    <Form.Group as={Row} className="my-3">
                        <Form.Label column md="3" lg="4"><strong>Email</strong></Form.Label>
                        <Col md="8" lg="7">
                            <Form.Control type="email" value={this.state.email}
                                          name="email" onChange={this.handleChange} disabled={!editMode}
                                          placeholder={editMode ? "Your email" : ""}
                            />
                        </Col>
                        {editMode ?
                            <Col md={1} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltip(validators.email.message)}>
                                    {validators.email.validate ?
                                        <i className="fas fa-check-circle" style={{color: "#009432"}}/> :
                                        <i className="fas fa-exclamation-triangle" style={{color: "#C23616"}}/>
                                    }
                                </OverlayTrigger>
                            </Col>: null
                        }
                    </Form.Group>
                    <Form.Group as={Row} className="my-3">
                        <Form.Label column md="3" lg="4"><strong>Name</strong></Form.Label>
                        <Col md="8" lg="7">
                            <Form.Control type="text" value={this.state.name}
                                          name="name" onChange={this.handleChange} disabled={!editMode}
                                          placeholder={editMode ? "Your full name" : ""}
                            />
                        </Col>
                        {editMode ?
                            <Col md={1} style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltip(validators.name.message)}>
                                    {validators.name.validate ?
                                        <i className="fas fa-check-circle" style={{color: "#009432"}}/> :
                                        <i className="fas fa-exclamation-triangle" style={{color: "#C23616"}}/>
                                    }
                                </OverlayTrigger>
                            </Col>: null
                        }
                    </Form.Group>
                    {isOwner && editMode ?
                        <>
                            <Form.Group as={Row} className="my-3">
                                <Form.Label column md="3" lg="4"><strong>New Password</strong></Form.Label>
                                <Col md="8" lg="7">
                                    <Form.Control type="password" value={this.state.password}
                                                  name="password" onChange={this.handleChange} disabled={!editMode}
                                                  placeholder={editMode ? "Your password" : ""}
                                    />
                                </Col>
                                {editMode ?
                                    <Col md={1} style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }}
                                                        overlay={renderTooltip(validators.password.message)}>
                                            {validators.password.validate ?
                                                <i className="fas fa-check-circle" style={{color: "#009432"}}/> :
                                                <i className="fas fa-exclamation-triangle" style={{color: "#C23616"}}/>
                                            }
                                        </OverlayTrigger>
                                    </Col>: null
                                }
                            </Form.Group>
                            <Form.Group as={Row} className="my-3">
                                <Form.Label column md="3" lg="4"><strong>Repeat Password</strong></Form.Label>
                                <Col md="8" lg="7">
                                    <Form.Control type="password" value={this.state.repeatedPassword}
                                                  name="repeatedPassword" onChange={this.handleChange}
                                                  disabled={!editMode}
                                                  placeholder={editMode ? "Please retype your password again" : ""}
                                    />
                                </Col>
                                <Col md={1} style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <OverlayTrigger placement="right" delay={{show: 250, hide: 400}}
                                                    overlay={renderTooltip(validators.repeatedPassword.message)}>
                                        {validators.repeatedPassword.validate ?
                                            <i className="fas fa-check-circle" style={{color: "#009432"}}/> :
                                            <i className="fas fa-exclamation-triangle" style={{color: "#C23616"}}/>
                                        }
                                    </OverlayTrigger>
                                </Col>
                            </Form.Group>
                        </>: null}
                    <Form.Group as={Row} className="my-3">
                        <Form.Label column md="3" lg="4"><strong>Bio</strong></Form.Label>
                        <Col md="8" lg="7">
                            <Form.Control as="textarea" value={this.state.bio}
                                          name="bio" style={{resize: "none"}} rows={5}
                                          onChange={this.handleChange} disabled={!editMode}
                                          placeholder={editMode ? "Your biography" : ""}
                            />
                        </Col>
                        {editMode ?
                            <Col md={1} className="pt-2" style={{
                                display: "flex",
                                justifyContent: "center",
                            }}>
                                <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltip(validators.bio.message)}>
                                    {validators.bio.validate ?
                                        <i className="fas fa-check-circle"
                                           style={{color: "#009432", maxHeight: "16px"}}/> :
                                        <i className="fas fa-exclamation-triangle"
                                           style={{color: "#C23616", maxHeight: "16px"}}/>
                                    }
                                </OverlayTrigger>
                            </Col>: null
                        }
                    </Form.Group>
                    {this.props.user.type === "developer" ?
                        <>
                            <Form.Group as={Row} className="my-3">
                                <Form.Label column md="3" lg="4"><strong>Education</strong></Form.Label>
                                <Col md="8" lg="7">
                                    <Form.Control as="select" value={this.state.education}
                                                  name="education" className="custom-select"
                                                  onChange={this.handleChange} disabled={!editMode}>
                                        <option value="Null">{isOwner ? "Choose..." : "Not chosen"}</option>
                                        <option value="Undergraduate">Undergraduate</option>
                                        <option value="Graduate">Graduate</option>
                                        <option value="Postgraduate">Postgraduate</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="my-3">
                                <Form.Label column md="3" lg="4"><strong>Current Role</strong></Form.Label>
                                <Col md="8" lg="7">
                                    <Form.Control as="select" value={this.state.role}
                                                  name="role" className="custom-select"
                                                  onChange={this.handleChange} disabled={!editMode}>
                                        <option value="Null">{isOwner ? "Choose..." : "Not chosen"}</option>
                                        <option value="Intern">Intern</option>
                                        <option value="JuniorDeveloper">Junior Developer</option>
                                        <option value="Developer">Developer</option>
                                        <option value="SeniorDeveloper">Senior Developer</option>
                                        <option value="TeamLeader">Team Leader</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="my-3">
                                <Form.Label column md="3" lg="4"><strong>Experience</strong></Form.Label>
                                <Col md="8" lg="7">
                                    <Form.Control as="select" value={this.state.experience}
                                                  name="experience" className={"custom-select"}
                                                  onChange={this.handleChange} disabled={!editMode}>
                                        <option value="Null">{isOwner ? "Choose..." : "Not chosen"}</option>
                                        <option value="Years01">0-1 year</option>
                                        <option value="Years12">1-2 years</option>
                                        <option value="Years24">2-4 years</option>
                                        <option value="Years46">4-6 years</option>
                                        <option value="Years610">6-10 years</option>
                                        <option value="Years1015">10-15 years</option>
                                        <option value="Years15up">15+ years</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </>: null}
                    <Editable>
                        <Row className="justify-content-end m-0 mt-4">
                            {editMode ?
                                <>
                                    <Button type="button" className="btn btn-gray rounded mr-2"
                                            onClick={this.toggleMode}>Cancel</Button>
                                    <Button type={allCorrect ? "submit" : "button"}
                                            className={"btn btn-blue rounded"+(allCorrect ? "" : " disabled")}>
                                        Save changes
                                    </Button>
                                </>:
                                <Button type="button" className="btn btn-blue rounded"
                                        onClick={this.toggleMode}>Edit</Button>}
                        </Row>
                    </Editable>

                </Form>
            </div>
        );
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Profile);