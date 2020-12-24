import React, {Component} from "react";

import {Button, Col, Form, Row, Badge, Modal, OverlayTrigger, Tooltip} from "react-bootstrap"
import {connect} from "react-redux";

import {SkillsModal} from "./SkillsComponent";
import {format} from "date-fns";
import {editProject} from "../Redux/ActionCreators";
import {projectEditValidators, projectEditValidatorsDefault} from "../Resources/ProjectEditValidators";
import {validate} from "../Resources/Validate";

const mapStoreToProps = state => {
    return {
        user: state.user.user,
        specialities: state.skills.specialities,
        languages: state.skills.languages,
        frameworks: state.skills.frameworks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editProject: (project) => {dispatch(editProject(project))}
    }
};

class ProjectEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.project,
            isPreviewOpen: false,

            specialitySet: Array.from(this.props.project.specialitySet),
            isSpecialityOpen: false,

            languageSet: Array.from(this.props.project.languageSet),
            isLanguageOpen: false,

            frameworkSet: Array.from(this.props.project.frameworkSet),
            isFrameworkOpen: false,

            validators: projectEditValidatorsDefault,
        };
        this.specialities = this.props.specialities.filter(skill => this.props.project.specialitySet.filter(selectedSkill => selectedSkill === skill.id).length >= 1);
        this.languages = this.props.languages.filter(skill => this.props.project.languageSet.filter(selectedSkill => selectedSkill === skill.id).length >= 1);
        this.frameworks = this.props.frameworks.filter(skill => this.props.project.frameworkSet.filter(selectedSkill => selectedSkill === skill.id).length >= 1);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePreview = this.togglePreview.bind(this);
        this.toggleSpeciality = this.toggleSpeciality.bind(this);
        this.toggleLanguage = this.toggleLanguage.bind(this);
        this.toggleFramework = this.toggleFramework.bind(this);
        this.saveSpeciality = this.saveSpeciality.bind(this);
        this.saveLanguage = this.saveLanguage.bind(this);
        this.saveFramework = this.saveFramework.bind(this);
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        let validator = projectEditValidators[fieldName];
        if (projectEditValidators.hasOwnProperty(fieldName)) {
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

    handleSubmit() {
        this.props.editProject(this.state);
    }

    togglePreview() {
        this.setState({isPreviewOpen: !this.state.isPreviewOpen});
    }

    toggleSpeciality() {
        this.setState({isSpecialityOpen: !this.state.isSpecialityOpen});
    }

    saveSpeciality(selected) {
        this.specialities = this.props.specialities.filter(skill => selected.filter(selectedSkill => selectedSkill === skill.id).length >= 1);
        this.setState({isSpecialityOpen: false, specialitySet: selected});
    }

    toggleLanguage() {
        this.setState({isLanguageOpen: !this.state.isLanguageOpen});
    }

    saveLanguage(selected) {
        this.languages = this.props.languages.filter(skill => selected.filter(selectedSkill => selectedSkill === skill.id).length >= 1);
        this.setState({isLanguageOpen: false, languageSet: selected});
    }

    toggleFramework() {
        this.setState({isFrameworkOpen: !this.state.isFrameworkOpen});
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
            <Modal show={this.props.isOpen} onHide={this.props.toggle} size="xl" keyboard={true}
                   className={((this.state.isSpecialityOpen || this.state.isLanguageOpen || this.state.isFrameworkOpen) ? "invisible" : "visible")}>
                <div className="border rounded-10 bg-white p-5">
                    <h3 className="mb-4">Create a new project</h3>
                    <Form onSubmit={this.handleSubmit} method="PUT">
                        <Form.Group as={Row} className="my-3 m-2">
                            <Form.Label column sm={4}><strong>Project's name</strong></Form.Label>
                            <Col sm={7}>
                                <Form.Control name="name" onChange={this.handleChange}
                                              defaultValue={this.state.name}/>
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
                                <Form.Control as="select" defaultValue={this.state.type}
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
                                <Form.Control name="shortDescription" as="textarea"
                                              style={{resize: "none"}} onChange={this.handleChange}
                                              defaultValue={this.state.shortDescription}/>
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
                                              defaultValue={this.state.salary}/>
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
                                <Form.Control name="deadline" type="date" onChange={this.handleChange}
                                              defaultValue={format(Date.parse(this.state.deadline), "yyyy-MM-dd")}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="my-3 m-2">
                            <Form.Label column sm={4}><strong>Description</strong></Form.Label>
                            <Col sm={7}>
                                <Form.Control name="description" as="textarea"
                                              style={{resize: "none"}} rows={10} onChange={this.handleChange}
                                              defaultValue={this.state.description}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="my-3 m-2">
                            <Form.Label column sm={4}><strong>Specialities</strong></Form.Label>
                            <Col sm={7}>
                                {this.specialities.map(skill =>
                                    <Badge key={skill.id} pill className="specialities-badge py-2 px-3 mr-2 mb-2">{skill.name}</Badge>)}
                                <Badge pill className="specialities-badge py-2 mr-2 mb-2" style={{fontSize: "30px"}} onClick={this.toggleSpeciality}>
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
                            <Button type="reset" className="btn btn-gray rounded mr-2" onClick={this.props.toggle}>Cancel</Button>
                            <Button type={allCorrect ? "submit" : "button"} className={"btn btn-blue rounded"+(allCorrect ? "" : " disabled")}>Save changes</Button>
                        </Row>
                    </Form>
                </div>
            </Modal>
        )
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(ProjectEdit);