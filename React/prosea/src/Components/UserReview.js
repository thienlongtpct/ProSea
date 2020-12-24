import React, {Component} from "react";
import {Container} from "react-bootstrap";

import Navigation from "./NavigationConponent";
import Reviews from "./ReviewsComponent";

class UserProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        window.scrollTo(0,0);
    }

    render() {
        return (
            <>
                <Navigation navItems={this.props.navItems} activeItem="reviews"/>
                <Container className="max-screen pb-5">
                    <Reviews/>
                </Container>
            </>
        )
    }
}

export default UserProjects;