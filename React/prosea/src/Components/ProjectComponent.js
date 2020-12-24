import React, {Component} from "react";

import {Card, Badge} from "react-bootstrap";

import ProjectModal from "./ProjectModalComponent";
import {connect} from "react-redux";
import {format} from "date-fns";
import {editProject} from "../Redux/ActionCreators";

const mapStoreToProps = state => {
    return {
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

let authUser = JSON.parse(localStorage.getItem("user"));

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            isModalOpen: false,
            userSet: Array.from(this.props.project.userSet),
            developerSet: Array.from(this.props.project.developerSet),
            isBookmark: authUser && this.props.project.developerSet.filter(user => user === authUser.username).length >= 1
        }
        this.toggleBookmark = this.toggleBookmark.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleBookmark() {
        let developerSet = this.state.developerSet;
        let authUser = JSON.parse(localStorage.getItem("user"));
        let isBookmark;
        if (developerSet.filter(username => username === authUser.username).length >= 1) {
            isBookmark = false;
            developerSet.splice(developerSet.indexOf(authUser.username), 1);
        }
        else {
            isBookmark = true;
            developerSet.push(authUser.username);
        }
        this.setState({developerSet: developerSet, isBookmark: isBookmark});
        this.props.editProject({...this.props.project, developerSet: developerSet});
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    render() {
        let project = this.props.project;
        let specialities = this.props.specialities.filter(skill => project.specialitySet.filter(selectedSkill => selectedSkill === skill.id).length >= 1);
        let languages = this.props.languages.filter(skill => project.languageSet.filter(selectedSkill => selectedSkill === skill.id).length >= 1);
        let frameworks = this.props.frameworks.filter(skill => project.frameworkSet.filter(selectedSkill => selectedSkill === skill.id).length >= 1);
        let isDeveloper = authUser && authUser.type === "developer";
        let isOwner = authUser && project.userSet.filter(username => username === authUser.username).length >= 1;
        return (
            <>
                <>
                    <Card className="rounded-10 border-0" style={{height: "100%"}}>
                        <Card.Header className="text-center pt-4 pb-0">
                            <h3 className="m-2" style={{fontWeight: "700 !important"}}>
                                {project.name}
                                <div className="text-center d-inline align-middle ml-2" onClick={this.toggleBookmark} style={{color: "#e59500", fontSize: "1.2rem"}}>
                                    {isDeveloper ?
                                        this.state.isBookmark ?
                                            <i className="fas fa-star"/> :
                                            <i className="far fa-star"/>
                                        : null
                                    }
                                </div>
                            </h3>
                            {(Date.parse(project.deadline) > Date.now()) ?
                                <Badge className="active-badge p-2 my-1">
                                    <i className="fas fa-clock mr-2"/>{format(Date.parse(project.deadline), 'dd/MM/yyyy')}
                                </Badge> :
                                <Badge className="expired-badge p-2 my-1">
                                    <i className="far fa-clock mr-2"/>{format(Date.parse(project.deadline), 'dd/MM/yyyy')}
                                </Badge>

                            }
                            <br/>
                            <Badge className="salary-badge p-2 mt-1">
                                <i className="fas fa-ruble-sign mr-2"/>{project.salary}
                            </Badge>
                            {project.type === "Complete" ?
                                <Badge className="complete-badge p-2 ml-2">
                                    <i className="fas fa-check-circle mr-2"/>Complete
                                </Badge> :
                                    project.type === "InProgress" ?
                                        <Badge className="in-progress-badge p-2 ml-2">
                                            <i className="fas fa-spinner mr-2"/>In Progress
                                        </Badge> :
                                            <Badge className="requested-badge p-2 ml-2">
                                                <i className="fas fa-search mr-2"/>Requested
                                            </Badge>
                            }
                            <hr className="w-75 mx-auto mb-1"/>
                        </Card.Header>
                        <Card.Body onClick={this.toggleModal} className="mt-0 pt-0 d-flex flex-column">
                            <div className="mt-3">
                                <div className="mx-2">
                                    <p className="text-justify">{project.shortDescription}</p>
                                </div>
                            </div>
                            <div className="text-center mt-auto">
                                <div className="mb-2">
                                    {
                                        specialities.map((speciality, i) => {
                                            return (i < 2 ?
                                                    <Badge key={speciality.id} pill className="specialities-badge py-2 px-3 mr-2">{speciality.name}</Badge> :
                                                    i === 2 ?
                                                        <Badge key={speciality.id} pill className="specialities-badge py-2 px-3">. . .</Badge> :
                                                        null
                                            );
                                        })
                                    }
                                </div>
                                <div className="mb-2">
                                    {
                                        languages.map((language, i) => {
                                            return (i < 2 ?
                                                    <Badge key={language.id} pill className="languages-badge py-2 px-3 mr-2">{language.name}</Badge> :
                                                    i === 2 ?
                                                        <Badge key={language.id} pill className="languages-badge py-2 px-3">. . .</Badge> :
                                                        null
                                            );
                                        })
                                    }
                                </div>
                                <div className="mb-2">
                                    {
                                        frameworks.map((framework, i) => {
                                            return (i < 2 ?
                                                    <Badge key={framework.id} pill className="frameworks-badge py-2 px-3 mr-2">{framework.name}</Badge> :
                                                    i === 2 ?
                                                        <Badge key={framework.id} pill className="frameworks-badge py-2 px-3">. . .</Badge> :
                                                        null
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <ProjectModal isOpen={this.state.isModalOpen} toggle={this.toggleModal}
                                  project={project} edit={isOwner} button/>
                </>
            </>
        );
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Project);