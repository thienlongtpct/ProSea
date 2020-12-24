import React, {Component} from "react";

import "../CSS/Footer.css";
import {Row, Col, Image} from "react-bootstrap";

class Footer extends Component {
    render () {
        return (
            <>
                <div className="social-panel-container w-75 pb-5 mt-auto">
                    <hr/>
                    <div className="social-panel">
                        <Row>
                            <Col lg={3}>
                                <a href="/"><Image src="/Images/logo-mini.png" className="logo d-inline mr-2" style={{width: "40px"}}/></a>
                                <p className="d-inline" style={{fontSize: "20px", verticalAlign: "bottom"}}>@ 2020 ProSea</p>
                            </Col>
                            <Col lg={5} md={6}>
                                <p><strong className="mr-2">ProTips!</strong>Filling all the information help you easier get in touch
                                    with other developers and companies</p>
                            </Col>
                            <Col lg={4} md={6} className="text-center">
                                <h4>Contact us</h4>
                                <Row className="contact">
                                    <Col>
                                        <a href="https://vk.com/id510323435" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-vk"/>
                                        </a>
                                    </Col>
                                    <Col>
                                        <a href="https://instagram.com/leoduykhanh" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-instagram"/>
                                        </a>
                                    </Col>
                                    <Col>
                                        <a href="https://facebook.com/duykhanh.leo.1" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-facebook"/>
                                        </a>
                                    </Col>
                                    <Col>
                                        <a href="https://github.com/khanhnd9x" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-github"/>
                                        </a>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </>
        )
    }
}

export default Footer;