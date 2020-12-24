import React, {Component} from "react";

import {Button, Col, Container, Form, Row, Badge, OverlayTrigger, Tooltip} from "react-bootstrap"
import {connect} from "react-redux";

import {BaseURL} from "../Resources/BaseURL";
import Navigation from "./NavigationConponent";
import ProjectModal from "./ProjectModalComponent";
import {SkillsModal} from "./SkillsComponent";
import {addProjectValidators, addProjectValidatorsDefault} from "../Resources/AddProjectValidators";
import {validate} from "../Resources/Validate";

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow = tomorrow.toISOString().substr(0,10);

const mapStoreToProps = state => {
    return {
        user: state.user.user,
        specialities: state.skills.specialities,
        languages: state.skills.languages,
        frameworks: state.skills.frameworks
    }
}

class UserAddProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: "Requested",
            shortDescription: "",
            description: "",
            salary: "",
            deadline: tomorrow,
            userSet: [this.props.user.username],

            validators: addProjectValidatorsDefault,

            isPreviewOpen: false,

            specialitySet: [],
            isSpecialityOpen: false,

            languageSet: [],
            isLanguageOpen: false,

            frameworkSet: [],
            isFrameworkOpen: false
        };
        this.specialities = this.props.specialities.filter(skill => this.state.specialitySet.filter(selectedSkill => selectedSkill === skill.id).length >= 1);
        this.languages = this.props.languages.filter(skill => this.state.languageSet.filter(selectedSkill => selectedSkill === skill.id).length >= 1);
        this.frameworks = this.props.frameworks.filter(skill => this.state.frameworkSet.filter(selectedSkill => selectedSkill === skill.id).length >= 1);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePreview = this.togglePreview.bind(this);
        this.toggleSpeciality = this.toggleSpeciality.bind(this);
        this.toggleLanguage = this.toggleLanguage.bind(this);
        this.toggleFramework = this.toggleFramework.bind(this);
        this.saveSpeciality = this.saveSpeciality.bind(this);
        this.saveLanguage = this.saveLanguage.bind(this);
        this.saveFramework = this.saveFramework.bind(this);
        window.scrollTo(0,0);
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        let validator = addProjectValidators[fieldName];
        if (addProjectValidators.hasOwnProperty(fieldName)) {
            this.setState({
                [fieldName]: fieldValue,
                validators: {
                    ...this.state.validators,
                    [fieldName]: validate(fieldValue, validator)
                }
            });
        }
        else this.setState({[fieldName]: fieldValue});
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(BaseURL + "addProject/", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    let error = new Error("Error: "+response.status+": "+response.statusText);
                    error.response = response;
                    throw error;
                }
            }, error => {
                throw error;
            })
            .then(() => window.location = "http://localhost:3000/"+this.props.user.username+"/projects")
            .catch(error => alert(error.message));
    }

    togglePreview() {
        this.setState({isPreviewOpen: !this.state.isPreviewOpen});
    }

    toggleSpeciality() {
        this.setState({isSpecialityOpen: !this.state.isSpecialityOpen});
    }

    toggleLanguage() {
        this.setState({isLanguageOpen: !this.state.isLanguageOpen});
    }

    toggleFramework() {
        this.setState({isFrameworkOpen: !this.state.isFrameworkOpen});
    }

    saveSpeciality(selected) {
        this.specialities = this.props.specialities.filter(skill => selected.filter(selectedSkill => selectedSkill === skill.id).length >= 1);
        this.setState({isSpecialityOpen: false, specialitySet: selected});
    }

    saveLanguage(selected) {
        this.languages = this.props.languages.filter(skill => selected.filter(selectedSkill => selectedSkill === skill.id).length >= 1);
        this.setState({isLanguageOpen: false, languageSet: selected});
    }

    saveFramework(selected) {
        this.frameworks = this.props.frameworks.filter(skill => selected.filter(selectedSkill => selectedSkill === skill.id).length >= 1);
        this.setState({isFrameworkOpen: false, frameworkSet: selected});
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
            <>
                <Navigation navItems={this.props.navItems} activeItem="add-project"/>
                <Container className="max-screen pb-5">
                    <div className="rounded-10 bg-white p-4 p-md-5">
                        <h3 className="mb-4">Create a new project</h3>
                        <Form onSubmit={this.handleSubmit} method="PUT">
                            <Form.Group as={Row} className="my-3 m-2">
                                <Form.Label column sm={4}><strong>Project's name</strong></Form.Label>
                                <Col sm={7}>
                                    <Form.Control name="name" onChange={this.handleChange} placeholder="Your project's name"/>
                                </Col>
                                <Col md={1} style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }}
                                                    overlay={renderTooltip(validators.name.message)}>
                                        {
                                            validators.name.validate ?
                                                <i className="fas fa-check-circle" style={{color: "#009432"}}/> :
                                                <i className="fas fa-exclamation-triangle" style={{color: "#C23616"}}/>
                                        }
                                    </OverlayTrigger>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="my-3 m-2">
                                <Form.Label column sm={4}><strong>Type</strong></Form.Label>
                                <Col sm={7}>
                                    <Form.Control as="select" defaultValue="Requested"
                                                  name="type" className="custom-select"
                                                  onChange={this.handleChange}>
                                        <option value="Null">Choose...</option>
                                        <option value="Requested">Requested</option>
                                        <option value="InProgress">In Progress</option>
                                        <option value="Complete">Complete</option>
                                    </Form.Control>
                                </Col>
                                <Col md={1} style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }}
                                                    overlay={renderTooltip(validators.type.message)}>
                                        {
                                            validators.type.validate ?
                                                <i className="fas fa-check-circle" style={{color: "#009432"}}/> :
                                                <i className="fas fa-exclamation-triangle" style={{color: "#C23616"}}/>
                                        }
                                    </OverlayTrigger>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="my-3 m-2">
                                <Form.Label column sm={4}><strong>Short description</strong></Form.Label>
                                <Col sm={7}>
                                    <Form.Control name="shortDescription" as="textarea" rows="3"
                                                  style={{resize: "none"}} onChange={this.handleChange}
                                                  placeholder="Short description of your project (not more than 250 characters)"
                                    />
                                </Col>
                                <Col md={1} style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }}
                                                    overlay={renderTooltip(validators.shortDescription.message)}>
                                        {
                                            validators.shortDescription.validate ?
                                                <i className="fas fa-check-circle" style={{color: "#009432"}}/> :
                                                <i className="fas fa-exclamation-triangle" style={{color: "#C23616"}}/>
                                        }
                                    </OverlayTrigger>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="my-3 m-2">
                                <Form.Label column sm={4}><strong>Salary</strong></Form.Label>
                                <Col sm={7}>
                                    <Form.Control name="salary" type="number" onChange={this.handleChange}
                                                  placeholder="Projects' salary"
                                    />
                                </Col>
                                <Col md={1} style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }}
                                                    overlay={renderTooltip(validators.salary.message)}>
                                        {
                                            validators.salary.validate ?
                                                <i className="fas fa-check-circle" style={{color: "#009432"}}/> :
                                                <i className="fas fa-exclamation-triangle" style={{color: "#C23616"}}/>
                                        }
                                    </OverlayTrigger>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="my-3 m-2">
                                <Form.Label column sm={4}><strong>Deadline</strong></Form.Label>
                                <Col sm={7}>
                                    <Form.Control name="deadline" type="date"
                                                  defaultValue={tomorrow} onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="my-3 m-2">
                                <Form.Label column sm={4}><strong>Description</strong></Form.Label>
                                <Col sm={7}>
                                    <Form.Control name="description" as="textarea"
                                                  style={{resize: "none"}} rows={10} onChange={this.handleChange}
                                                  placeholder="Detail description of your project"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="my-3 m-2">
                                <Form.Label column sm={4}><strong>Specialities</strong></Form.Label>
                                <Col sm={7}>
                                    {this.specialities.map(skill =>
                                        <Badge key={skill.id} pill
                                               className="specialities-badge py-2 px-3 mr-2 mb-2">
                                            {skill.name}
                                        </Badge>)}
                                    <Badge pill className="specialities-badge py-2 mr-2 mb-2"
                                           style={{fontSize: "30px"}} onClick={this.toggleSpeciality}>
                                        <i className="fas fa-pen-alt"/>
                                    </Badge>
                                    <SkillsModal isOpen={this.state.isSpecialityOpen} selected={this.state.specialitySet}
                                                 toggle={this.toggleSpeciality} save={this.saveSpeciality}
                                                 all={this.props.specialities} name="Specialities"/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="my-3 m-2">
                                <Form.Label column sm={4}><strong>Languages</strong></Form.Label>
                                <Col sm={7}>
                                    {this.languages.map(skill =>
                                            <Badge key={skill.id} pill className="languages-badge py-2 px-3 mr-2 mb-2">{skill.name}</Badge>)}
                                    <Badge pill className="languages-badge py-2 mr-2 mb-2" onClick={this.toggleLanguage}>
                                        <i className="fas fa-pen-alt"/>
                                    </Badge>
                                    <SkillsModal isOpen={this.state.isLanguageOpen} selected={this.state.languageSet}
                                                 toggle={this.toggleLanguage} save={this.saveLanguage}
                                                 all={this.props.languages} name="Programming Languages"/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="my-3 m-2">
                                <Form.Label column sm={4}><strong>Frameworks and Tools</strong></Form.Label>
                                <Col sm={7}>
                                    {this.frameworks.map(skill =>
                                            <Badge key={skill.id} pill className="frameworks-badge py-2 px-3 mr-2 mb-2">{skill.name}</Badge>)}
                                    <Badge pill className="frameworks-badge py-2 mr-2 mb-2" onClick={this.toggleFramework}>
                                        <i className="fas fa-pen-alt"/>
                                    </Badge>
                                    <SkillsModal isOpen={this.state.isFrameworkOpen} selected={this.state.frameworkSet}
                                                 toggle={this.toggleFramework} save={this.saveFramework}
                                                 all={this.props.frameworks} name="Frameworks and Tools"/>
                                </Col>
                            </Form.Group>
                            <Row className="justify-content-end mt-4 mx-2 px-3">
                                <Button type="button" className={"btn btn-green rounded mr-2"+(allCorrect ? "" : " disabled")}
                                        onClick={allCorrect ? this.togglePreview : null}>Preview</Button>
                                <Button type={allCorrect ? "submit" : "button"} className={"btn btn-blue rounded"+(allCorrect ? "" : " disabled")}>Save changes</Button>
                            </Row>
                        </Form>
                    </div>
                </Container>
                <ProjectModal isOpen={this.state.isPreviewOpen} toggle={this.togglePreview} project={this.state} review/>
            </>
        )
    }
}

export default connect(mapStoreToProps, null)(UserAddProject);