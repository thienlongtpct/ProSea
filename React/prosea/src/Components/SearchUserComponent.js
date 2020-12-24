import React, {Component} from "react";
import "../CSS/SearchUser.css";
import Collapse from 'react-bootstrap/Collapse'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Image} from "react-bootstrap";

class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            result: null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;
        if (value !== "") {
            fetch("http://localhost:8080/searchUser/" + value)
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        isOpen: true,
                        result: response
                    })
                });
        }
        else this.setState({
            isOpen: false,
            result: null
        })
    }

    render() {
        let result = this.state.result;
        return (
            <div className="search-user">
                <Row className="bar mx-3">
                    <Col md={1}>
                        <i className="fas fa-search d-inline"/>
                    </Col>
                    <Col md={11}>
                        <input type="text" placeholder="Find other users on ProSea"
                               className="search-bar d-inline"
                               style={{
                                   lineHeight: "38px",
                                   backgroundColor: "#f0f2f5",
                               }}
                               onChange={this.handleChange}
                        />
                    </Col>
                </Row>
                <div className="expand px-3">
                    <Collapse in={this.state.isOpen} className="m-2">
                        <div>
                            {result != null ?
                                (result.length > 0) ?
                                    result.map(user =>
                                        <Row className="result rounded py-2">
                                            <Col md={2} className="d-lg-block d-none">
                                                <Image as="img"
                                                       src={"/Images/Avatar/"+ user.avatar}/>
                                            </Col>
                                            <Col md={10} style={{display: "flex", alignItems:"center", cursor: "pointer"}}
                                                 onClick={() => window.location = "http://localhost:3000/"+user.username}>
                                                <b className="username text-primary">
                                                    {user.username}
                                                </b>
                                            </Col>
                                        </Row>
                                    ) :
                                        <div className="w-100">
                                            <p>No Result Found (T⌓T)</p>
                                        </div>
                            : null}
                        </div>
                    </Collapse>
                </div>
            </div>
        )
    }
}

export default SearchUser;