import React, {Component} from "react";

import {Form, Modal, FormControl} from "react-bootstrap"
import {connect} from "react-redux";

import "react-input-range/lib/css/index.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const mapStoreToProps = state => {
    return {
        specialities: state.skills.specialities,
        languages: state.skills.languages,
        frameworks: state.skills.frameworks
    }
}

class ProjectSearch extends Component {
    render() {
        return (
            <>
                <Modal show={this.props.isOpen} onHide={this.props.toggle} keyboard={true}>
                    <div className="p-xl-5 p-lg-4 p-5 pt-2">
                        <Form inline className="border" style={{borderRadius: "10rem"}}>
                            <i className="fas fa-search ml-3 d-inline" style={{fontSize: "15px", color: "#495057"}}/>
                            <FormControl type="text" placeholder="Search projects" className="mr-3 search-bar d-inline"/>
                        </Form>
                    </div>
                </Modal>
            </>
        )
    }
}

export default connect(mapStoreToProps, null)(ProjectSearch);