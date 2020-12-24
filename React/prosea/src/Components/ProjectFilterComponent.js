import React, {Component} from "react";

import {Button, Col, Form, Row, Badge, Modal} from "react-bootstrap"
import {connect} from "react-redux";

import {SkillsModal} from "./SkillsComponent";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {DateRange} from 'react-date-range';
import {addDays, subDays} from 'date-fns';
import Switch from "react-switch";

const mapStoreToProps = state => {
    return {
        specialities: state.skills.specialities,
        languages: state.skills.languages,
        frameworks: state.skills.frameworks
    }
}

class ProjectFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prefix: this.props.prefix,
            type: "Null",
            hideExpired: false,

            salary: {
                min: 0,
                max: 100000
            },

            deadlineRange: {
                startDate: subDays(new Date(), 365),
                endDate: addDays(new Date(), 365),
                key: 'deadlineRange'
            },

            specialitySet: [],
            isSpecialityOpen: false,

            languageSet: [],
            isLanguageOpen: false,

            frameworkSet: [],
            isFrameworkOpen: false
        };
        this.specialities = [];
        this.languages = [];
        this.frameworks = [];
        this.handleChange = this.handleChange.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.setState({[fieldName]: fieldValue});
    }

    handleSwitch() {
        this.setState({hideExpired: !this.state.hideExpired});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.filter({
            ...this.state
        });
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

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.prefix !== nextProps.prefix) {
            return ({prefix: nextProps.prefix});
        }
        return null;
    }

    render() {
        return (
            <>
                <Modal show={this.props.isOpen} size="xl"
                       onHide={this.props.toggle} keyboard={true}
                       className={((this.state.isSpecialityOpen || this.state.isLanguageOpen || this.state.isFrameworkOpen) ?
                           "invisible" : "visible")}>
                    <div className="p-xl-5 p-lg-4 p-5">
                        <h3 className="mb-4">Filter project</h3>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col lg="7">
                                    <Form.Group as={Row} className="mb-md-4 m-lg-2">
                                        <Form.Label column lg="4"><strong>Type</strong></Form.Label>
                                        <Col lg="8" className="mt-2 mt-lg-0">
                                            <Form.Control as="select" value={this.state.type}
                                                          name="type" className="custom-select"
                                                          onChange={this.handleChange}>
                                                <option value="Null">Choose...</option>
                                                <option value="Requested">Requested</option>
                                                <option value="InProgress">In Progress</option>
                                                <option value="Complete">Complete</option>
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="my-lg-4 mb-md-4 m-lg-2">
                                        <Form.Label column lg="4"><strong>Salary</strong></Form.Label>
                                        <Col lg="8" className="p-2 px-4 mt-2 mt-lg-0">
                                            <InputRange
                                                draggableTrack
                                                formatLabel={value => `${value} ₽`}
                                                minValue={0}
                                                maxValue={100000}
                                                value={this.state.salary}
                                                onChange={value => this.setState({salary: value})} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-md-4 m-lg-2">
                                        <Form.Label column lg="4"><strong>Hide Expired</strong></Form.Label>
                                        <Col lg="8" className="p-2 px-3 mt-2 mt-lg-0">
                                            <Switch onChange={this.handleSwitch} checked={this.state.hideExpired}
                                                    onColor="#86d3ff"
                                                    onHandleColor="#2693e6"
                                                    handleDiameter={14}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    boxShadow="0px 1px 3px rgba(0, 0, 0, 0.6)"
                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                    height={10}
                                                    width={40}
                                                    className=""/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="my-lg-4 mb-md-4 m-lg-2">
                                        <Form.Label column lg="4"><strong>Specialities</strong></Form.Label>
                                        <Col lg="8" className="mt-2 mt-lg-0">
                                            {this.specialities.map(skill =>
                                                <Badge key={skill.id} pill className="specialities-badge py-2 px-3 mr-2 mb-2">{skill.name}</Badge>)}
                                            <Badge pill className="specialities-badge py-2 mr-2 mb-2" style={{fontSize: "30px"}} onClick={this.toggleSpeciality}>
                                                <i className="fas fa-pen-alt"/>
                                            </Badge>
                                            <SkillsModal isOpen={this.state.isSpecialityOpen} selected={this.state.specialitySet}
                                                         toggle={this.toggleSpeciality} save={this.saveSpeciality}
                                                         all={this.props.specialities} name={"Specialities"}/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="my-lg-4 mb-md-4 m-lg-2">
                                        <Form.Label column lg="4"><strong>Languages</strong></Form.Label>
                                        <Col lg="8" className="mt-2 mt-lg-0">
                                            {this.languages.map(skill =>
                                                <Badge key={skill.id} pill className="languages-badge py-2 px-3 mr-2 mb-2">{skill.name}</Badge>)}
                                            <Badge pill className="languages-badge py-2 mr-2 mb-2" onClick={this.toggleLanguage}>
                                                <i className="fas fa-pen-alt"/>
                                            </Badge>
                                            <SkillsModal isOpen={this.state.isLanguageOpen} selected={this.state.languageSet}
                                                         toggle={this.toggleLanguage} save={this.saveLanguage}
                                                         all={this.props.languages} name={"Programming Languages"}/>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="my-lg-4 mb-md-4 m-lg-2">
                                        <Form.Label column lg="4"><strong>Frameworks</strong></Form.Label>
                                        <Col lg="8" className="mt-2 mt-lg-0">
                                            {this.frameworks.map(skill =>
                                                <Badge key={skill.id} pill className="frameworks-badge py-2 px-3 mr-2 mb-2">{skill.name}</Badge>)}
                                            <Badge pill className="frameworks-badge py-2 mr-2 mb-2" onClick={this.toggleFramework}>
                                                <i className="fas fa-pen-alt"/>
                                            </Badge>
                                            <SkillsModal isOpen={this.state.isFrameworkOpen} selected={this.state.frameworkSet}
                                                         toggle={this.toggleFramework} save={this.saveFramework}
                                                         all={this.props.frameworks} name={"Frameworks and Tools"}/>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col lg="5" className="mt-lg-3">
                                    <strong className="">Deadline</strong> <br/>
                                    <DateRange
                                        className="w-100 mt-3"
                                        onChange={item => this.setState({deadlineRange: item.deadlineRange})}
                                        months={1}
                                        minDate={subDays(new Date(), 900)}
                                        maxDate={addDays(new Date(), 900)}
                                        direction="vertical"
                                        scroll={{enabled: true}}
                                        dateDisplayFormat="dd/MM/yyyy"
                                        ranges={[this.state.deadlineRange]}
                                    />
                                </Col>
                            </Row>
                            <Row className="justify-content-end mt-4 mx-2 px-3">
                                <Button type="reset" className="btn btn-gray rounded mr-2" onClick={this.props.toggle}>Cancel</Button>
                                <Button type="submit" className="btn btn-blue rounded">Filter</Button>
                            </Row>
                        </Form>
                    </div>
                </Modal>
            </>
        )
    }
}

export default connect(mapStoreToProps, null)(ProjectFilter);