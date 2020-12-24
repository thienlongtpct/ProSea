import React, {Component} from "react";

import {connect} from "react-redux";

import "../CSS/Profile.css";

const mapStoreToProps = state => {
    return {
        user: state.user.user
    }
}

class Editable extends Component {
    render() {
        let authUser = JSON.parse(localStorage.getItem("user"));
        if (this.props.reversed)
            return (authUser && this.props.user.username === authUser.username) ? null : <>{this.props.children}</>;
        return  (authUser && this.props.user.username === authUser.username) ? <>{this.props.children}</> : null;
    }
}

export default connect(mapStoreToProps, null)(Editable);