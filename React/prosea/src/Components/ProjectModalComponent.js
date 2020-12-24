import React, {Component} from "react";

import {Badge, Row, Button, Modal, Col} from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import {connect} from "react-redux";
import ProjectEdit from "./ProjectEditComponent";
import {deleteProject, isProjectRequested, addProjectRequest, deleteRequest} from "../Redux/ActionCreators";

const mapStoreToProps = state => {
    return {
        specialities: state.skills.specialities,
        languages: state.skills.languages,
        frameworks: state.skills.frameworks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteProject: (id) => {dispatch(deleteProject(id))},
        isProjectRequested: (username, id, callback) => {dispatch(isProjectRequested(username, id, callback))},
        addProjectRequest: (username, id, callback) => {dispatch(addProjectRequest(username, id, callback))},
        deleteRequest: (id) => {dispatch(deleteRequest(id))}
    }
};

class ProjectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            requestId: -1
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.addProjectRequest = this.addProjectRequest.bind(this);
        this.deleteRequest = this.deleteRequest.bind(this);
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen});
        this.props.toggle();
    }

    deleteProject() {
        if (window.confirm("Do you really want to delete this project?")) {
            this.props.deleteProject(this.props.project.id);
            window.location.reload();
        }
    }

    addProjectRequest() {
        let authUser = JSON.parse(localStorage.getItem("user"));
        if (authUser)
            this.props.addProjectRequest(authUser.username, this.props.project.id,
                id => this.setState({requestId: id}));
        else alert('Please sign in to add a request!');
        this.props.toggle();
    }

    deleteRequest() {
        this.props.deleteRequest(this.state.requestId);
        this.setState({requestId: -1});
        this.props.toggle();
    }

    componentDidMount() {
        let authUser = JSON.parse(localStorage.getItem("user"));
        if (authUser && !this.props.review)
            this.props.isProjectRequested(authUser.username, this.props.project.id,
                id => this.setState({requestId: id}))
    }

    render() {
        let specialities = this.props.specialities.filter(skill => this.props.project.specialitySet.filter(selectedSkill => selectedSkill === skill.id).length >= 1);
        let languages = this.props.languages.filter(skill => this.props.project.languageSet.filter(selectedSkill => selectedSkill === skill.id).length >= 1);
        let frameworks = this.props.frameworks.filter(skill => this.props.project.frameworkSet.filter(selectedSkill => selectedSkill === skill.id).length >= 1);
        let project = this.props.project;
        return (
            <>
                <Modal show={this.props.isOpen} animation={false}
                       onHide={this.props.toggle} size="xl" keyboard={true}>
                    <Modal.Header>
                        <Modal.Title className="w-100">
                            <Row className="px-4 pt-4 m-0">
                                <Col sm={9}><h1>
                                    {project.name}
                                </h1>
                                    <Badge className="salary-badge p-2">
                                        <i className="fas fa-ruble-sign mr-2"/>{project.salary}
                                    </Badge>
                                    {project.type === "Complete" ?
                                        <Badge className="p-2 ml-2" variant="success">
                                            <i className="fas fa-check-circle mr-2"/>Complete
                                        </Badge> : null
                                    }
                                    {project.type === "InProgress" ?
                                        <Badge className="p-2 ml-2" variant="warning">
                                            <i className="fas fa-spinner mr-2"/>In Progress
                                        </Badge> : null
                                    }
                                    {project.type === "Requested" ?
                                        <Badge className="p-2 ml-2" variant="danger">
                                            <i className="fas fa-search mr-2"/>Requested
                                        </Badge> : null
                                    }
                                </Col>
                                <Col sm={3} className="text-center">
                                    <h5 style={{position: "absolute", bottom: "0"}}>
                                        Deadline: {moment(project.deadline).format("DD/MM/YYYY")}
                                    </h5>
                                </Col>
                            </Row>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="px-4 m-0">
                            <Col sm={8}>
                                {project.shortDescription}
                                <hr/>
                                <ReactMarkdown>{project.description}</ReactMarkdown>
                            </Col>
                            <Col sm={4}>
                                <h4>Owners</h4>
                                    {project.userSet.map((user, i) => (<a className="d-block" key={i} href={"http://localhost:3000/"+user}>@{user}</a>))}
                                <h4 className="my-3">Tags</h4>
                                <div className="my-2">
                                    {specialities.map(skill => <Badge key={skill.id} pill className="specialities-badge py-2 px-3 mr-2 mb-2">{skill.name}</Badge>)}
                                </div>
                                <div className="my-2">
                                    {languages.map(skill => <Badge key={skill.id} pill className="languages-badge py-2 px-3 mr-2 mb-2">{skill.name}</Badge>)}
                                </div>
                                <div className="my-2">
                                    {frameworks.map(skill => <Badge key={skill.id} pill className="frameworks-badge py-2 px-3 mr-2 mb-2">{skill.name}</Badge>)}
                                </div>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-gray mr-2" onClick={this.props.toggle}>Close</Button>
                        {this.props.button ?
                            this.props.edit ?
                                <>
                                    <Button type="button" className="btn btn-red mr-2" onClick={this.deleteProject}>Delete</Button>
                                    <Button type="button" className="btn btn-blue" onClick={this.toggleModal}>Edit</Button>
                                </> :
                                this.state.requestId >= 0 ?
                                    <Button type="button" className="btn btn-red" onClick={this.deleteRequest}>Delete request</Button> :
                                    <Button type="button" className="btn btn-green" onClick={this.addProjectRequest}>Add request</Button> :
                            null
                        }
                    </Modal.Footer>
                </Modal>
                <ProjectEdit project={project} isOpen={this.state.isModalOpen} toggle={this.toggleModal}/>
            </>
        );
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(ProjectModal);