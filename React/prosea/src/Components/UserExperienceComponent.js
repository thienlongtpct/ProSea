import React from "react";
import Navigation from "./NavigationConponent";
import {Col, Container, Row} from "react-bootstrap";
import Skills from "./SkillsComponent";
import Educations from "./EducationsComponent";
import Employments from "./EmploymentsComponent";

function UserExperience(props) {
    window.scrollTo(0,0);
    return (
        <>
            <Navigation navItems={props.navItems} activeItem="experience" url={props.url}/>
            <Container className="max-screen pb-5">
                <Row style={{marginLeft: "-0.75rem", marginRight: "-0.75rem"}}>
                    <Col md="5" lg="4" style={{padding: "0 0.75rem"}}>
                        <Skills name="Specialities"/>
                        <Skills name="Programming Languages"/>
                        <Skills name="Frameworks and Tools"/>
                    </Col>
                    <Col md="7" lg="8" style={{padding: "0 0.75rem"}}>
                        <Employments/>
                        <Educations/>
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default UserExperience;