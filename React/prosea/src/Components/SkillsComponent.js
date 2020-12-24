import React, {Component} from "react";

import {Button, Col, Image, Modal, Row} from "react-bootstrap";
import {connect} from "react-redux";

import {editUser} from "../Redux/ActionCreators";
import Loading from "./LoadingComponent";

import "../CSS/Skills.css";
import Editable from "./EditableComponent";

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
        editUser: (user, reload) => {dispatch(editUser(user, reload))}
    }
};

export class SkillsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: Array.from(this.props.selected)
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleSelect = this.toggleSelect.bind(this);
    }

    handleClose() {
        this.props.toggle();
        this.setState({
            selected: Array.from(this.props.selected)
        });
    }

    handleSubmit() {
        this.props.save(Array.from(this.state.selected));
    }

    toggleSelect(event) {
        let selected = this.state.selected;
        if (event.currentTarget.classList.contains("checked")) {
            event.currentTarget.classList.remove("checked");
            selected.splice(selected.indexOf(parseInt(event.currentTarget.getAttribute("itemId"))), 1);
        }
        else {
            event.currentTarget.classList.add("checked");
            selected.push(parseInt(event.currentTarget.getAttribute("itemId")));
        }
        this.setState({
            selected: selected.sort((a, b) => parseInt(a)-parseInt(b))
        });
    }

    render () {
        return (
            <Modal show={this.props.isOpen} onHide={this.handleClose} dialogClassName="skills" keyboard={true}>
                <Modal.Header>
                    <Modal.Title>
                        <h4>{this.props.name}</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row as="ul" className="modal-skills user-select-none m-0" sm="3">
                        {
                            this.props.all.map(skill => {
                                    return (
                                        <Col key={skill.id} as="li">
                                            <div onClick={this.toggleSelect} itemID={skill.id}
                                                 className={this.state.selected.filter(selectedSkill => selectedSkill === skill.id).length >= 1 ? "checked" : ""}>
                                                <Image src={"/Images/Skills/"+skill.icon} width={"60%"}/>
                                                <p className="mt-3">{skill.name}</p>
                                            </div>
                                        </Col>
                                    );
                                }
                            )
                        }
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" className="btn btn-gray mr-3" onClick={this.handleClose}>Close</Button>
                    <Button type="submit" className="btn btn-blue" onClick={this.handleSubmit}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class Skills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            selected: null,
            all:  this.props.name === "Specialities" ? this.props.specialities :
                    this.props.name === "Programming Languages" ? this.props.languages :
                        this.props.frameworks
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.saveModal = this.saveModal.bind(this);
    }

    componentDidMount() {
        let selected = [];
        if (this.props.name === "Specialities")
            this.props.user.specialitySet.map(skill => selected.push(skill));
        else if (this.props.name === "Programming Languages")
            this.props.user.languageSet.map(skill => selected.push(skill));
        else
            this.props.user.frameworkSet.map(skill => selected.push(skill));
        this.setState({selected: selected.sort((a, b) => parseInt(a)-parseInt(b))});
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    saveModal(selected) {
        let newUser = this.props.user;
        if (this.props.name === "Specialities") newUser.specialitySet = selected;
        else if (this.props.name === "Programming Languages") newUser.languageSet = selected;
        else newUser.frameworkSet = selected;
        this.props.editUser(newUser, false);
        this.setState({isModalOpen: false, selected: Array.from(selected)});
    }

    render () {
        let selected = this.state.selected;
        let all = this.state.all;
        if (selected === null) return <Loading/>;
        return (
            <div className="skills-tables rounded-10 mb-4 p-3 bg-white text-center">
                <h5 className="mt-2 mb-3">{this.props.name}</h5>
                <Row as="ul" className="m-2 user-select-none" sm={3} md={2} lg={3}>
                    {
                        selected.map(id => (
                            <Col key={id} as="li">
                                <Image src={"/Images/Skills/"+all[id-1].icon} width="45px"/>
                                <p className="mt-3">{all[id-1].name}</p>
                            </Col>
                        ))
                    }
                </Row>
                <Editable>
                    <Button as="button" className="btn btn-gray w-100" onClick={this.toggleModal}>Edit Details</Button>
                    <SkillsModal isOpen={this.state.isModalOpen} selected={selected}
                                 toggle={this.toggleModal} save={this.saveModal}
                                 all={all} name={this.props.name}/>
                </Editable>
            </div>
        );
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Skills);