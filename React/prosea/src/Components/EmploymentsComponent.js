import React, {Component} from "react";
import {Col, Row, Image} from "react-bootstrap";
import Loading from "./LoadingComponent";
import {connect} from "react-redux";
import "../CSS/Experience.css";
import {format} from "date-fns";
import FormModal from "./FormModalComponent";
import {employmentsFormFields} from "../Resources/EmploymentsFormFields";
import Editable from "./EditableComponent";
import moment from "moment";
import {addEmployment, deleteEmployment, editEmployment, fetchEmployments} from "../Redux/ActionCreators";
import ReactPaginate from "react-paginate";
import {employmentValidators, employmentValidatorsDefault} from "../Resources/EmploymentValidators";

const mapStoreToProps = state => {
    return {
        user: state.user.user,
        employments: state.employments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchEmployments: (username) => {dispatch(fetchEmployments(username))},
        editEmployment: (employment) => {dispatch(editEmployment(employment))},
        addEmployment: (username, employment, callback) => {dispatch(addEmployment(username, employment, callback))},
        deleteEmployment:  (id) => {dispatch(deleteEmployment(id))}
    }
};

class Employment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.employment,
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteEmployment = this.deleteEmployment.bind(this);
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleSubmit(employment) {
        this.setState({...employment, isModalOpen: !this.state.isModalOpen});
        this.props.editEmployment(employment);
        this.props.edit(employment);
    }

    deleteEmployment() {
        this.props.deleteEmployment(this.state.id);
        this.props.del(this.state.id);
    }

    render() {
        return (
            <>
                <Col lg={2} className="d-lg-block d-none">
                    <Image  src="/Images/Experience/Employment.svg"/>
                </Col>
                <Col lg={10}>
                    <div className="d-flex">
                        <div className="w-100">
                            <h5 className="mb-2">{this.state.company}</h5>
                            <strong style={{fontSize: "1.1rem"}}>{this.state.name}</strong>
                            <p>From {format(Date.parse(this.state.startAt), "dd/MM/yyyy")} - {format(Date.parse(this.state.endAt), "dd/MM/yyyy")}</p>
                            <p>{this.state.describe}</p>
                            <hr className="mb-4"/>
                        </div>
                        <Editable>
                            <div className="position-relative" style={{marginTop: "-10px"}}>
                                <i className="fas fa-pen p-3 d-block" id="edit-exp" onClick={this.toggleModal}/>
                                <i className="fas fa-trash p-3 d-block" id="delete-exp" onClick={this.deleteEmployment}/>
                            </div>
                        </Editable>
                    </div>
                </Col>
                <Editable>
                    <FormModal isOpen={this.state.isModalOpen} toggle={this.toggleModal} submit={this.handleSubmit}
                               content={this.state} fields={employmentsFormFields} title="Edit employment"
                               validators={employmentValidators} validatorsDefault={employmentValidatorsDefault}
                    />
                </Editable>
            </>
        )
    }
}

export const Employment2 = connect(mapStoreToProps, mapDispatchToProps)(Employment);

class Employments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employments: null,
            isModalOpen: false,
            currentPage: 0,
            pages: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.editEmployment = this.editEmployment.bind(this);
        this.deleteEmployment = this.deleteEmployment.bind(this);
    }

    handleSubmit(employment) {
        this.props.addEmployment(this.props.user.username, employment, (id) => {
            let employments = this.state.employments;
            employments.push({...employment, id: id});
            this.setState({employments: employments, pages: employments.length});
        });
        this.toggleModal();
    }

    handlePageClick(selectedPage) {
        this.setState({currentPage: selectedPage.selected});
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    editEmployment(newEmployment) {
        let employments = this.state.employments.map(employment => employment.id === newEmployment.id ? newEmployment : employment);
        this.setState({employments: employments});
    }

    deleteEmployment(employmentId) {
        let employments = this.state.employments.filter(employment => employment.id !== employmentId);
        let currentPage = this.state.currentPage;
        if (currentPage*3 < employments.length)
            this.setState({employments: employments, pages: employments.length});
        else
            this.setState({employments: employments,
                pages: employments.length,
                currentPage: Math.max(0, currentPage-1)});
    }

    componentDidMount() {
        this.props.fetchEmployments(this.props.user.username);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.employments === null && nextProps.employments.employments) {
            return ({employments: nextProps.employments.employments, pages: nextProps.employments.employments.length});
        }
        return null;
    }

    render() {
        if (this.props.employments.isLoading) return <Loading/>;
        let currentPage = this.state.currentPage;
        let employments = this.state.employments
            .sort((a, b) => Date.parse(b.endAt)-Date.parse(a.endAt))
            .slice(currentPage*3, Math.min(this.state.employments.length, (currentPage+1)*3));
        return (
            <div className="employment rounded-10 bg-white p-5 pb-4 mb-4 text-center">
                <Row className="mb-3 m-0">
                    <h3 className="mb-4 mr-auto">Employment</h3>
                    <Editable>
                        <div style={{paddingRight: "15px"}}>
                            <i className="fas fa-plus p-3" id="add-exp" onClick={this.toggleModal}/>
                        </div>
                    </Editable>
                </Row>
                <Row className="m-0 text-justify">
                    {employments.map(employment => <Employment2 key={employment.id} employment={employment} rerender={this.rerender}
                                                                 del={this.deleteEmployment} edit={this.editEmployment}/>)}
                </Row>
                <Editable>
                    <FormModal isOpen={this.state.isModalOpen} toggle={this.toggleModal} submit={this.handleSubmit}
                               fields={employmentsFormFields} title="Add employment" content={{
                                   name: "",
                                   company: "",
                                   startAt: moment(),
                                   endAt: moment(),
                                   describe: ""}}
                               validators={employmentValidators} validatorsDefault={employmentValidatorsDefault}/>
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

export default connect(mapStoreToProps, mapDispatchToProps)(Employments);