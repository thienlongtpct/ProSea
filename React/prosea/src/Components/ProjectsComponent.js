import React, {Component} from "react";
import {Row, Col} from "react-bootstrap";
import Project from "./ProjectComponent";
import {fetchAllProjects, fetchProjects} from "../Redux/ActionCreators";
import {connect} from "react-redux";
import Loading from "./LoadingComponent";
import "../CSS/Badges.css";
import "../CSS/Cards.css";

const mapStoreToProps = state => {
    return {
        user: state.user.user,
        projects: state.projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProjects: (username, sort, pageNum, isBookmark, filter) => {dispatch(fetchProjects(username, sort, pageNum, isBookmark, filter))},
        fetchAllProjects: (sort, pageNum, filter) => {dispatch(fetchAllProjects(sort, pageNum, filter))}
    }
};

class Projects extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.pageNum !== prevProps.pageNum || this.props.sort !== prevProps.sort || this.props.filter !== prevProps.filter)
            if (this.props.all) {
                this.props.fetchAllProjects(
                    this.props.sort,
                    this.props.pageNum,
                    this.props.filter);
            }
            else {
                this.props.fetchProjects(
                    this.props.user.username,
                    this.props.sort,
                    this.props.pageNum,
                    this.props.isBookmark,
                    this.props.filter);
            }
    }

    componentDidMount() {
        if (this.props.all) {
            this.props.fetchAllProjects(
                this.props.sort,
                this.props.pageNum,
                this.props.filter);
        }
        else {
            this.props.fetchProjects(
                this.props.user.username,
                this.props.sort,
                this.props.pageNum,
                this.props.isBookmark,
                this.props.filter);
        }
    }

    render() {
        if (this.props.projects.isLoading) return <Loading/>;
        const projects = this.props.projects.projects;
        return (
            <>
                <Row style={{margin: "-0.75rem"}}>
                    {projects.map((project, i) =>
                        <Col md={6} lg={4} key={project.id} style={{padding: "0.75rem"}}>
                            <Project project={project} timeOut={i}/>
                        </Col>
                    )}
                </Row>
            </>
        );
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Projects);