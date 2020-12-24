import React, {Component} from "react";

import {Switch, Redirect, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import Header from "../Components/HeaderComponent";
import Cover from "../Components/UserCoverComponent";
import UserExperience from "../Components/UserExperienceComponent";
import Loading from "../Components/LoadingComponent";
import UserProfile from "../Components/UserProfileComponent";
import UserProjects from "../Components/UserProjectsComponent";
import {fetchUser} from "../Redux/ActionCreators";
import UserAddProject from "../Components/UserAddProjectComponent";
import {developersNavItems, otherDevelopersNavItems} from "../Resources/DevelopersNavItems";
import UserRequest from "../Components/UserRequestComponent";
import UserReview from "../Components/UserReview";
import {companiesNavItems, otherCompaniesNavItems} from "../Resources/CompaniesNavItems";
import "../CSS/Pagination.css";
import Error from "../Components/ErrorComponent";
import Footer from "../Components/FooterComponent";

const mapStoreToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: (username) => {dispatch(fetchUser(username))}
    }
};

class User extends Component {
    componentDidMount() {
        this.props.fetchUser(this.props.username);
    }

    render() {
        const user = this.props.user;
        if (user.isLoading) return <Loading/>;
        if (user.errorMess) return <Error error={user.errorMess}/>;
        let authUser = JSON.parse(localStorage.getItem("user"));
        let navItems = (authUser && authUser.username === this.props.username) ? developersNavItems : otherDevelopersNavItems;
        if (user.user.type === "company") navItems = (authUser && authUser.username === this.props.username) ? companiesNavItems : otherCompaniesNavItems;
        return (
            <>
                <Header/>
                <Cover/>
                {navItems === developersNavItems ?
                    <Switch>
                        <Route exact path={this.props.match.url+"/profile"}
                               component={() => <UserProfile navItems={navItems}/>}/>
                        <Route exact path={this.props.match.url+"/projects"}
                               component={() => <UserProjects active="projects"
                                                             navItems={navItems}
                                                             typeProjects="getProjects/"
                                                            />}/>
                        <Route exact path={this.props.match.url+"/experience"} component={() => <UserExperience navItems={navItems}/>}/>
                        <Route exact path={this.props.match.url+"/add-project"}
                               component={() => <UserAddProject navItems={navItems}/>}/>
                        <Route exact path={this.props.match.url+"/bookmark"}
                               component={() => <UserProjects active="bookmark"
                                                             navItems={navItems}
                                                             typeProjects="getBookmark/"/>}/>
                        <Route exact path={this.props.match.url+"/join-request"}
                               component={() => <UserRequest navItems={navItems}/>}/>
                        <Route exact path={this.props.match.url+"/reviews"} component={() => <UserReview navItems={navItems}/>}/>
                        <Redirect to={this.props.match.url+"/profile"}/>
                    </Switch> :
                navItems === otherDevelopersNavItems ?
                    <Switch>
                        <Route exact path={this.props.match.url+"/profile"}
                               component={() => <UserProfile navItems={navItems}/>}/>
                        <Route exact path={this.props.match.url+"/projects"}
                               component={() => <UserProjects active="projects"
                                                             navItems={navItems}
                                                             typeProjects="getProjects/"
                                                            />}/>
                        <Route exact path={this.props.match.url+"/reviews"} component={() => <UserReview navItems={navItems}/>}/>
                        <Route exact path={this.props.match.url+"/experience"} component={() => <UserExperience navItems={navItems}/>}/>
                        <Redirect to={this.props.match.url+"/profile"}/>
                    </Switch> :
                navItems === companiesNavItems ?
                    <Switch>
                        <Route exact path={this.props.match.url+"/profile"}
                               component={() => <UserProfile navItems={navItems}/>}/>
                        <Route exact path={this.props.match.url+"/projects"}
                               component={() => <UserProjects active="projects"
                                                             navItems={navItems}
                                                             typeProjects="getProjects/"
                               />}/>
                        <Route exact path={this.props.match.url+"/add-project"}
                               component={() => <UserAddProject navItems={navItems}/>}/>
                        <Route exact path={this.props.match.url+"/join-request"}
                               component={() => <UserRequest navItems={navItems}/>}/>
                        <Redirect to={this.props.match.url+"/profile"}/>
                    </Switch> :
                    <Switch>
                        <Route exact path={this.props.match.url+"/profile"}
                               component={() => <UserProfile navItems={navItems}/>}/>
                        <Route exact path={this.props.match.url+"/projects"}
                               component={() => <UserProjects active="projects"
                                                             navItems={navItems}
                                                             typeProjects="getProjects/"
                               />}/>
                        <Redirect to={this.props.match.url+"/profile"}/>
                    </Switch>}
                <Footer/>
            </>
        )
    }
}

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(User));