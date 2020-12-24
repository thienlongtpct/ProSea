import React, {Component} from "react";
import {Col, Row, Image} from "react-bootstrap";
import Loading from "./LoadingComponent";
import {connect} from "react-redux";
import {format} from "date-fns";
import FormModal from "./FormModalComponent";
import {educationsFormFields} from "../Resources/EducationsFormFields";
import Editable from "./EditableComponent";
import moment from "moment";
import {addEducation, deleteEducation, editEducation, fetchEducations} from "../Redux/ActionCreators";
import ReactPaginate from "react-paginate";
import {educationValidators, educationValidatorsDefault} from "../Resources/EducationValidators";

const mapStoreToProps = state => {
    return {
        user: state.user.user,
        educations: state.educations
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchEducations: (username) => {dispatch(fetchEducations(username))},
        editEducation: (education) => {dispatch(editEducation(education))},
        addEducation: (username, education, callback) => {dispatch(addEducation(username, education, callback))},
        deleteEducation:  (id) => {dispatch(deleteEducation(id))}
    }
};

class Education extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.education,
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteEducation = this.deleteEducation.bind(this);
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleSubmit(education) {
        this.setState({...education, isModalOpen: !this.state.isModalOpen});
        this.props.editEducation(education);
        this.props.edit(education);
    }

    deleteEducation() {
        this.props.deleteEducation(this.state.id);
        this.props.del(this.state.id);
    }

    render() {
        return (
            <>
                <Col lg={2} className="d-lg-block d-none">
                    <Image src="/Images/Experience/Education.svg"/>
                </Col>
                <Col lg={10}>
                    <div className="d-flex">
                        <div className="w-100">
                            <h5 className="mb-2">{this.state.school}</h5>
                            <strong style={{fontSize: "1.1rem"}}>{this.state.name}</strong>
                            <p>From {format(Date.parse(this.state.startAt), "dd/MM/yyyy")} - {format(Date.parse(this.state.endAt), "dd/MM/yyyy")}</p>
                            <hr className="mb-4"/>
                        </div>
                        <Editable>
                            <div className="position-relative" style={{marginTop: "-10px"}}>
                                <i className="fas fa-pen p-3 d-block" id="edit-exp" onClick={this.toggleModal}/>
                                <i className="fas fa-trash p-3 d-block" id="delete-exp" onClick={this.deleteEducation}/>
                            </div>
                        </Editable>
                    </div>
                </Col>
                <Editable>
                    <FormModal isOpen={this.state.isModalOpen} toggle={this.toggleModal} submit={this.handleSubmit}
                               content={this.state} fields={educationsFormFields} title="Edit education"
                               validators={educationValidators} validatorsDefault={educationValidatorsDefault}
                    />
                </Editable>
            </>
        )
    }
}

export const Education2 = connect(mapStoreToProps, mapDispatchToProps)(Education);

class Educations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            educations: null,
            isModalOpen: false,
            currentPage: 0,
            pages: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.editEducation = this.editEducation.bind(this);
        this.deleteEducation = this.deleteEducation.bind(this);
    }

    handleSubmit(education) {
        this.props.addEducation(this.props.user.username, education, (id) => {
            let educations = this.state.educations;
            educations.push({...education, id: id});
            this.setState({educations: educations, pages: educations.length});
        });
        this.toggleModal();
    }

    handlePageClick(selectedPage) {
        this.setState({currentPage: selectedPage.selected});
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    editEducation(newEducation) {
        let educations = this.state.educations.map(education => education.id === newEducation.id ? newEducation : education);
        this.setState({educations: educations});
    }

    deleteEducation(educationId) {
        let educations = this.state.educations.filter(education => education.id !== educationId);
        let currentPage = this.state.currentPage;
        if (currentPage*3 < educations.length)
            this.setState({educations: educations, pages: educations.length});
        else
            this.setState({educations: educations,
                pages: educations.length,
                currentPage: Math.max(0, currentPage-1)});
    }

    componentDidMount() {
        this.props.fetchEducations(this.props.user.username);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.educations === null && nextProps.educations.educations) {
            return ({educations: nextProps.educations.educations, pages: nextProps.educations.educations.length});
        }
        return null;
    }

    render() {
        if (this.props.educations.isLoading) return <Loading/>;
        let currentPage = this.state.currentPage;
        let educations = this.state.educations
            .sort((a, b) => Date.parse(b.endAt)-Date.parse(a.endAt))
            .slice(currentPage*3, Math.min(this.state.educations.length, (currentPage+1)*3));
        return (
            <div className="education rounded-10 bg-white p-5 pb-4 text-center">
                <Row className="mb-3 m-0">
                    <h3 className="mb-4 mr-auto">Education</h3>
                        <Editable>
                            <div style={{paddingRight: "15px"}}>
                                <i className="fas fa-plus p-3" id="add-exp" onClick={this.toggleModal}/>
                            </div>
                        </Editable>
                </Row>
                <Row className="m-0 text-justify">
                    {educations.map(education => <Education2 key={education.id} education={education} rerender={this.rerender}
                                                                 del={this.deleteEducation} edit={this.editEducation}/>)}
                </Row>
                <Editable>
                    <FormModal isOpen={this.state.isModalOpen} toggle={this.toggleModal} submit={this.handleSubmit}
                               fields={educationsFormFields} title="Add education" content={{
                        name: "",
                        school: "",
                        startAt: moment(),
                        endAt: moment()}}
                               validators={educationValidators} validatorsDefault={educationValidatorsDefault}
                    />
                </Editable>
                {this.state.pages > 3 ?
                    <ReactPaginate
                        previousLabel={"❮"}
                        nextLabel={"❯"}
                        forcePage={this.state.currentPage}
                        pageCount={Math.ceil(this.state.pages/3)}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination-change"}
                        nextLinkClassName={"pagination-change"}
                        disabledClassName={"pagination-change-disabled"}
                        activeLinkClassName={"pagination-active"}
                        breakClassName={"pagination-break"}
                    /> : null}
            </div>
        )
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Educations);