import React, {Component} from "react";

import {Switch, Redirect, Route} from "react-router-dom";

import Home from "./HomeComponent";
import {fetchSkills} from "../Redux/ActionCreators";
import {connect} from "react-redux";
import Loading from "../Components/LoadingComponent";
import User from "./UserComponent";
import "../CSS/Buttons.css";
import "../CSS/Modals.css";


const mapStoreToProps = state => {
    return {
        skills: state.skills
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSkills: () => {dispatch(fetchSkills())}
    }
};

class Main extends Component {
    componentDidMount() {
        this.props.fetchSkills();
    }

    render() {
        if (this.props.skills.isLoading) return <Loading/>;
        if (this.props.skills.errorMess !== null) return <h1>{this.props.skills.errorMess}</h1>;
        const UserPage = ({match}) => (
            <User username={match.params.username}/>
        );
        return(
            <Switch>
                <Route exact path="/" component={() => <Home/>}/>
                <Route path="/:username" component={UserPage}/>
                <Redirect to="/home"/>
            </Switch>
        )
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Main);