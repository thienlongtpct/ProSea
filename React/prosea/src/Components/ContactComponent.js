import React, {Component} from "react";

import {Container, Image, Button} from "react-bootstrap";
import {connect} from "react-redux";

import "../CSS/Contact.css";
import {fetchContact, editContact} from "../Redux/ActionCreators";
import FormModal from "./FormModalComponent";
import {contactFormFields} from "../Resources/ContactFormFields";
import Editable from "./EditableComponent";
import Loading from "./LoadingComponent";
import {contactValidators, contactValidatorsDefault} from "../Resources/ContactValidators";

const mapStoreToProps = state => {
    return {
        user: state.user.user,
        contact: state.contact
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editContact: (contact, username, isCompany) => {dispatch(editContact(contact, username, isCompany))},
        fetchContact: (username) => {dispatch(fetchContact(username))}
    }
};

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.contact.contact,
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleSubmit(contact) {
        this.setState({...contact, isModalOpen: !this.state.isModalOpen},
            () => this.props.editContact(this.state, this.props.user.username));
    }

    componentDidMount() {
        this.props.fetchContact(this.props.user.username);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.contact.contact !== this.props.contact.contact) {
            this.setState({...this.props.contact.contact, isModalOpen: false});
        }
    }

    render () {
        if (this.props.contact.isLoading) return <Loading/>;
        return (
            <div className="contact rounded-10 mb-4 p-4 bg-white">
                <h5 className="mb-3">Contact</h5>
                <Container>
                    <div>
                        {this.state.telephone !== "" && this.state.telephone ?
                            <div className="my-3">
                                <Image src="/Images/Contact/telephone.svg" width="20px" className={"mr-3"}/>
                                {this.state.telephone}
                            </div> :
                            null
                        }
                    </div>
                    <div>
                        {this.state.city !== "" && this.state.city ?
                            <div className="mb-3">
                                <Image src="/Images/Contact/city.svg" width="20px" className={"mr-3"}/>
                                {this.state.city}
                            </div> :
                            null
                        }
                    </div>
                    <div>
                        {this.state.github !== "" && this.state.github ?
                            <div className="mb-3">
                                <a href={"https://github.com/"+this.state.github} target="_blank" rel="noopener noreferrer">
                                    <Image src="/Images/Contact/github.svg" width="20px" className={"mr-3"}/>
                                    {this.state.github}
                                </a>
                            </div> :
                            null
                        }
                    </div>
                    <div>
                        {this.state.gitlab !== "" && this.state.gitlab ?
                            <div className="mb-3">
                                <a href={"https://gitlab.com/"+this.state.gitlab} target="_blank" rel="noopener noreferrer">
                                    <Image src="/Images/Contact/gitlab.svg" width="20px" className={"mr-3"}/>
                                    {this.state.gitlab}
                                </a>
                            </div> :
                            null
                        }
                    </div>
                    <div>
                        {this.state.facebook !== "" && this.state.facebook ?
                            <div className="mb-3">
                                <a href={"https://www.facebook.com/"+this.state.facebook} target="_blank" rel="noopener noreferrer">
                                    <Image src="/Images/Contact/facebook.svg" width="20px" className={"mr-3"}/>
                                    {this.state.facebook}
                                </a>
                            </div> :
                            null
                        }
                    </div>
                    <div>
                        {this.state.instagram !== "" && this.state.instagram ?
                            <div className="mb-3">
                                <a href={"https://www.instagram.com/"+this.state.instagram} target="_blank" rel="noopener noreferrer">
                                    <Image src="/Images/Contact/instagram.svg" width="20px" className={"mr-3"}/>
                                    {this.state.instagram}
                                </a>
                            </div> :
                            null
                        }
                    </div>
                    <div>
                        {this.state.vk !== "" && this.state.vk ?
                            <div className="mb-3">
                                <a href={"https://vk.com/"+this.state.vk} target="_blank" rel="noopener noreferrer">
                                    <Image src="/Images/Contact/vk.svg" width="20px" className={"mr-3"}/>
                                    {this.state.vk}
                                </a>
                            </div>:
                            null
                        }
                    </div>
                </Container>
                <Editable>
                    <Button as="button" className="btn btn-gray w-100" onClick={this.toggleModal}>Edit
                        Details</Button>
                    <FormModal isOpen={this.state.isModalOpen} toggle={this.toggleModal} submit={this.handleSubmit}
                               content={this.state} fields={contactFormFields} title="Contact information"
                               validators={contactValidators} validatorsDefault={contactValidatorsDefault}
                    />
                </Editable>
            </div>
        );
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Contact);