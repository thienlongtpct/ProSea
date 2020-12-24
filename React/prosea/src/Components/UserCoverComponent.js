import React, {Component} from "react";

import {Container, Image, Row, Col, Modal} from "react-bootstrap";
import {connect} from "react-redux";

import "../CSS/Cover.css";

const backgroundStyle = {
    color: {
        developer: "linear-gradient(#B3DDEA, #FFFFFF)",
        company: "linear-gradient(#CE4A44, #FFFFFF)"
    },
    background: {
        developer: "developer-background",
        company: "company-background"
    }
}

const mapStoreToProps = state => {
    return {
        user: state.user.user
    }
}

class Cover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            id: null
        }
    }

    render() {
        const user = this.props.user;
        return (
            <div className="pb-4" style={{backgroundImage: backgroundStyle.color[this.props.user.type]}}>
                <Container className={"mx-auto max-screen "+backgroundStyle.background[this.props.user.type]}>
                    <div style={{padding: "160px 30px 0 30px"}}>
                        <Row style={{maxHeight: "100% !important"}}>
                            <Col sm={3}>
                                <Image as="img" src={"/Images/Avatar/"+user.avatar} width={170} onClick={() => this.setState({isModalOpen: !this.state.isModalOpen})}/>
                            </Col>
                            <Col sm={7}>
                                <div className="short-info">
                                    <h3>{user.name !== "" ? user.name : user.username}</h3>
                                    {user.type === "developer" ?
                                        <Row className="w-75">
                                            <Col>
                                                <p><strong>{user.projectSize}</strong> project(s)</p>
                                            </Col>
                                            <Col>
                                                <p><strong>{user.reviewSize}</strong> review(s)</p>
                                            </Col>
                                        </Row> : null}
                                    <p className="mt-4">{user.bio}</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <Modal show={this.state.isModalOpen}
                       onHide={() => this.setState({isModalOpen: !this.state.isModalOpen})}
                       keyboard={true}
                       dialogClassName="modal-transparent">
                    <Image src={"/Images/"+user.avatar+".svg"} width={"1000px"}/>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStoreToProps, null)(Cover);