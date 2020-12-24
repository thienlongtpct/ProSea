import React, {Component} from "react";
import {Col, Row, Image} from "react-bootstrap";
import Loading from "./LoadingComponent";
import {connect} from "react-redux";
import "../CSS/Experience.css";
import {format} from "date-fns";
import Editable from "./EditableComponent";
import {fetchRequests, addProjectRequest, deleteRequest, acceptRequest} from "../Redux/ActionCreators";

import "../CSS/Request.css";

const mapStoreToProps = state => {
    return {
        user: state.user.user,
        requests: state.requests
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchRequests: (username) => {dispatch(fetchRequests(username))},
        addProjectRequest: (username, request, callback) => {dispatch(addProjectRequest(username, request, callback))},
        deleteRequest:  (id) => {dispatch(deleteRequest(id))},
        acceptRequest:  (id) => {dispatch(acceptRequest(id))}
    }
};

class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.request
        }
        this.acceptRequest = this.acceptRequest.bind(this);
        this.declineRequest = this.declineRequest.bind(this);
    }

    acceptRequest() {
        let id = this.state.id;
        this.props.acceptRequest(id);
        this.props.accept(id);
    }

    declineRequest() {
        let id = this.state.id;
        this.props.deleteRequest(id);
        this.props.decline(id);
    }

    render() {
        return (
            <>
                <Col lg={2} className="d-lg-block d-none">
                    <Image  src="/Images/Avatar/developer.svg"/>
                </Col>
                <Col lg={10}>
                    <div className="d-flex">
                        <div className="w-100">
                            <h5 className="mb-2">{this.state.projectName}</h5>
                            <strong style={{fontSize: "1.1rem"}}>{this.state.userName}</strong>
                            <p style={{color: "#AAAAAA", fontSize: "10px"}} className="mt-4">{format(Date.parse(this.state.createdAt), 'HH:mm:ss dd/MM/yyyy')}</p>
                            <hr className="mb-4"/>
                        </div>
                        <Editable>
                            <div className="position-relative" style={{marginTop: "-10px"}}>
                                <i className="fas fa-check p-3 d-block" id="add-exp" onClick={this.acceptRequest}/>
                                <i className="fas fa-times p-3 d-block" id="delete-exp" onClick={this.declineRequest}/>
                            </div>
                        </Editable>
                    </div>
                </Col>
            </>
        )
    }
}

export const Request2 = connect(mapStoreToProps, mapDispatchToProps)(Request);

class Requests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: null
        }
        this.acceptRequest = this.acceptRequest.bind(this);
        this.declineRequest = this.declineRequest.bind(this);
    }

    acceptRequest(requestId) {
        let requests = this.state.requests.filter(request => request.id !== requestId);
        this.setState({requests: requests});
    }

    declineRequest(requestId) {
        let requests = this.state.requests.filter(request => request.id !== requestId);
        this.setState({requests: requests});
    }

    componentDidMount() {
        this.setState(null, () =>
            this.props.fetchRequests(this.props.user.username));
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.requests === null) {
            return ({requests: nextProps.requests.requests});
        }
        return null;
    }

    render() {
        if (this.props.requests.isLoading) return <Loading/>;
        let requests = this.state.requests;
        requests.sort((a, b) => Date.parse(b.updatedAt)-Date.parse(a.updatedAt));
        return (
            <div className="request border rounded-10 bg-white p-5 pb-4 mb-4">
                <Row className="mb-3 m-0">
                    <h3 className="mb-4 mr-auto">Requests</h3>
                </Row>
                <Row className="m-0">
                    {requests.map(request => <Request2 key={request.id} request={request} rerender={this.rerender}
                                                       decline={this.declineRequest} accept={this.acceptRequest}/>)}
                </Row>
            </div>
        )
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Requests);