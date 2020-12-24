import React, {Component} from "react";

import {Button, Col, Form, Modal, OverlayTrigger, Row, Tooltip} from "react-bootstrap";

import "../CSS/Skills.css";
import {format} from "date-fns";
import Rating from "@material-ui/lab/Rating";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import {validate} from "../Resources/Validate";

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon/>,
        label: 'Very Dissatisfied'
    },
    2: {
        icon: <SentimentDissatisfiedIcon/>,
        label: 'Dissatisfied'
    },
    3: {
        icon: <SentimentSatisfiedIcon/>,
        label: 'Neutral'
    },
    4: {
        icon: <SentimentSatisfiedAltIcon/>,
        label: 'Satisfied'
    },
    5: {
        icon: <SentimentVerySatisfiedIcon/>,
        label: 'Very Satisfied'
    }
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

class FormModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.content,
            validators: {
                ...this.props.validatorsDefault
            }
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose() {
        this.props.toggle();
        this.setState({...this.props.content});
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        let validator = this.props.validators[fieldName];

        if (fieldName === "startAt" || fieldName === "endAt") {
            this.setState({[fieldName]: fieldValue}, () => {
                if (Date.parse(this.state.endAt) < Date.parse(this.state.startAt)) {
                    this.setState({
                        validators: {
                            ...this.state.validators,
                            startAt: {validate: false, message: "Date start must be before date end"},
                            endAt: {validate: false, message: "Date start must be before date end"}
                        }
                    })
                } else
                    this.setState({
                        validators: {
                            ...this.state.validators,
                            startAt: {validate: true, message: "Looks good!"},
                            endAt: {validate: true, message: "Looks good!"}
                        }
                    })
            });
            return;
        }

        if (this.props.validators.hasOwnProperty(fieldName)) {
            this.setState({
                [fieldName]: fieldValue,
                validators: {
                    ...this.state.validators,
                    [fieldName]: validate(fieldValue, validator)
                }
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.submit(this.state);
        this.setState({...this.props.content});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.content !== this.props.content) {
            let validators = this.state.validators;
            this.setState({...this.props.content}, () => {
                    for (let key in validators) {
                        if (validators.hasOwnProperty(key))
                            validators[key] = validate(this.state[key], this.props.validators[key])
                    }
                    this.setState({validators: validators});
                }
            )
        }
    }

    render () {
        const renderTooltip = (message) => (
            <Tooltip>
                {message}
            </Tooltip>
        );

        let allCorrect = true;
        let validators = this.state.validators;

        for (let key in validators) {
            if (validators.hasOwnProperty(key)) {
                allCorrect &= validators[key].validate;
            }
        }

        return (
            <Modal show={this.props.isOpen} onHide={this.handleClose} keyboard={true}>
                <Modal.Header>
                    <Modal.Title>
                        <h4>{this.props.title}</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {this.props.fields.map(field =>
                            <Form.Group key={field.id} as={Row}>
                                <Form.Label column md={4}>{field.label}</Form.Label>
                                <Col md={7} className={"my-auto"}>
                                    {field.type === "rating"
                                        ? <Rating
                                            defaultValue={this.state.rating}
                                            getLabelText={(value) => customIcons[value].label}
                                            IconContainerComponent={IconContainer}
                                            onChange={(event, value) => this.setState({rating: value})}
                                            name="Rating"
                                        />
                                        : <Form.Control type={field.type} name={field.name}
                                                        placeholder={field.placeholder}
                                                        as={field.textarea ? "textarea" : "input"} rows={3}
                                                        onChange={this.handleChange}
                                                        style={{resize: "none"}}
                                                        defaultValue={field.type === "date" ? format(Date.parse(this.state[field.name]), 'yyyy-MM-dd') : this.state[field.name]}/>
                                    }
                                </Col>
                                {field.name !== "rating" ?
                                    <Col md={1} style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip(this.state.validators[field.name].message)}>
                                            {
                                                this.state.validators[field.name].validate ?
                                                    <i className="fas fa-check-circle" style={{color: "#009432"}}/> :
                                                    <i className="fas fa-exclamation-triangle" style={{color: "#C23616"}}/>
                                            }
                                        </OverlayTrigger>
                                    </Col> : null}
                            </Form.Group>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" className="btn btn-gray mr-3" onClick={this.handleClose}>Close</Button>
                    <Button type="submit" className={"btn btn-blue"+(allCorrect ? "" : " disabled")} onClick={allCorrect ? this.handleSubmit : null}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default FormModal;