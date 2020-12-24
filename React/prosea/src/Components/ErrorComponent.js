import React, {Component} from "react";
import {Container, Image, Jumbotron} from "react-bootstrap";

import Header from "./HeaderComponent";
import Footer from "./FooterComponent";

class Error extends Component {
    render () {
        return (
            <div className="d-flex" style={{flexDirection: "column", height: "100vh"}}>
                <Header/>
                <Jumbotron style={{
                    backgroundColor: "#3B5998",
                    borderRadius: "0"
                }}>
                    <Container className="text-center">
                        <Image src="Images/name.png" width="175px" alt="Don't know reason :/"/>
                        <br/>
                        <Image src="Images/slogan.png" width="200px" alt="Same"/>
                        <h1 className="text-white" style={{fontSize: "75px"}}>
                            {this.props.error.message}
                        </h1>
                        <p className="lead text-white">
                            There is something wrong, please try again!
                        </p>
                    </Container>
                </Jumbotron>
                <Footer/>
            </div>
        )
    }
}

export default Error;