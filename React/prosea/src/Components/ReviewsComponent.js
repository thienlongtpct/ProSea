import React, {Component} from "react";
import {Col, Image, Row} from "react-bootstrap";
import {connect} from "react-redux";
import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import LinearProgress from "@material-ui/core/LinearProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import Loading from "./LoadingComponent";
import {
    addReview,
    deleteReview,
    editReview,
    fetchReviews
} from "../Redux/ActionCreators";
import Editable from "./EditableComponent";
import FormModal from "./FormModalComponent";
import {reviewsFormFields} from "../Resources/ReviewsFormField";
import {format} from "date-fns";
import ReactPaginate from "react-paginate";
import {reviewValidators, reviewValidatorsDefault} from "../Resources/ReviewValidators";

const mapStoreToProps = state => {
    return {
        user: state.user.user,
        reviews: state.reviews
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchReviews: (username) => {dispatch(fetchReviews(username))},
        editReview: (review) => {dispatch(editReview(review))},
        addReview: (review, callback) => {dispatch(addReview(review, callback))},
        deleteReview:  (id) => {dispatch(deleteReview(id))}
    }
};

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff'
    }
}))(LinearProgress);

const customIcons = {
    0: {
        icon: null,
        label: null
    },
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

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.review,
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteReview = this.deleteReview.bind(this);
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleSubmit(review) {
        this.setState({...review, isModalOpen: !this.state.isModalOpen});
        this.props.editReview(review);
        this.props.edit(review);
    }

    deleteReview() {
        this.props.deleteReview(this.state.id);
        this.props.del(this.state.id);
    }

    render() {
        const review = this.state;
        let authUser = JSON.parse(localStorage.getItem("user"));
        return (
            <Row key={review.id} className="m-0">
                <Col md={2} className="d-lg-block d-none">
                    <Image as="img"
                           src={"/Images/Avatar/"+review.userAvatar}
                           onClick={() => this.setState({isModalOpen: !this.state.isModalOpen})}/>
                </Col>
                <Col md={10} className="d-flex">
                    <div className="w-100">
                        <h5 className="mb-2">{review.userName ? review.userName : review.userUsername}</h5>
                        <Rating
                            name="customized-icons"
                            value={review.rating}
                            getLabelText={(value) => customIcons[value].label}
                            IconContainerComponent={IconContainer} readOnly
                        />
                        <p style={{minHeight: "75px"}}>{review.review}</p>
                        <p style={{color: "#AAAAAA", fontSize: "10px"}}>{format(Date.parse(review.createdAt), 'HH:mm:ss dd/MM/yyyy')
                        +' (Last updated: '+format(Date.parse(review.updatedAt), 'HH:mm:ss dd/MM/yyyy')+')'}</p>
                        <hr className="mb-4"/>
                    </div>
                    {authUser !== null && review.userUsername === authUser.username ?
                        <div className="position-relative" style={{marginTop: "-10px"}}>
                            <i className="fas fa-pen p-3 d-block" id="edit-exp" onClick={this.toggleModal}/>
                            <i className="fas fa-trash p-3 d-block" id="delete-exp" onClick={this.deleteReview}/>
                        </div>: null}
                </Col>

                {authUser && review.userUsername === authUser.username ?
                    <FormModal isOpen={this.state.isModalOpen} toggle={this.toggleModal} submit={this.handleSubmit}
                               fields={reviewsFormFields} title="Add a review" content={this.state}
                               validators={reviewValidators} validatorsDefault={reviewValidatorsDefault}
                    />: null}
            </Row>
        )
    }
}

export const Review2 = connect(mapStoreToProps, mapDispatchToProps)(Review);

class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: null,
            isModalOpen: false,
            currentPage: 0,
            pages: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.editReview = this.editReview.bind(this);
        this.deleteReview = this.deleteReview.bind(this);
    }

    handleSubmit(review) {
        this.props.addReview({
                ...review,
                userUsername: JSON.parse(localStorage.getItem("user")).username,
                ownerUsername: this.props.user.username
            }, (review) => {
                let reviews = this.state.reviews;
                reviews.push({...review});
                this.setState({reviews: reviews, pages: reviews.length});
        });
        this.toggleModal();
    }

    handlePageClick(selectedPage) {
        this.setState({currentPage: selectedPage.selected});
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    editReview(newReview) {
        let reviews = this.state.reviews.map(review => review.id === newReview.id ? newReview : review);
        this.setState({reviews: reviews});
    }

    deleteReview(reviewId) {
        let reviews = this.state.reviews.filter(review => review.id !== reviewId);
        let currentPage = this.state.currentPage;
        if (currentPage*3 < reviews.length)
            this.setState({reviews: reviews, pages: reviews.length});
        else
            this.setState({reviews: reviews,
                pages: reviews.length,
                currentPage: Math.max(0, currentPage-1)});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.reviews === null && nextProps.reviews.reviews) {
            return ({reviews: nextProps.reviews.reviews, pages: nextProps.reviews.reviews.length});
        }
        return null;
    }

    componentDidMount() {
        this.props.fetchReviews(this.props.user.username);
    }

    render() {
        if (this.props.reviews.isLoading) return <Loading/>;
        let authUser = JSON.parse(localStorage.getItem("user"));

        let reviews = this.state.reviews;
        let length = reviews.length;

        let sum = 0;
        reviews.forEach(review => sum = sum+parseInt(review.rating));

        let percent = [5, 4, 3, 2, 1];
        percent = percent.map(i => length > 0 ? reviews.filter(review => review.rating === i).length/length*100 : 0);

        let currentPage = this.state.currentPage;
        reviews = reviews.sort((a, b) => Date.parse(b.updatedAt)-Date.parse(a.updatedAt))
            .slice(currentPage*3, Math.min(length, (currentPage+1)*3));

        return (
            <Row style={{marginLeft: "-0.75rem", marginRight: "-0.75rem"}}>
                <Col md="5" lg="4" style={{padding: "0 0.75rem"}}>
                    <div className="skills-tables rounded-10 mb-4 p-3 bg-white text-center">
                        <h5 className="mt-3">Overall</h5>
                        <strong style={{fontSize: "4.5rem"}}>{(length > 0 ? sum/length : 0).toFixed(1)}</strong><br/>
                        {length > 0 ?
                            <Rating
                                defaultValue={sum/length}
                                getLabelText={(value) => customIcons[value].label}
                                IconContainerComponent={IconContainer}
                                name="Overall Rating" readOnly
                            /> : null}
                        <p>{length} review(s)</p>
                        <div className="mt-4">
                            <Row>
                                <Col sm={2}>
                                    <SentimentVerySatisfiedIcon style={{ color: "#28a745"}} className="mb-2"/>
                                </Col>
                                <Col sm={10} className="pt-2">
                                    <BorderLinearProgress variant="determinate" value={percent[0]}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={2}>
                                    <SentimentSatisfiedAltIcon style={{ color: "#4c9045"}} className="mb-2"/>
                                </Col>
                                <Col sm={10} className="pt-2">
                                    <BorderLinearProgress variant="determinate" value={percent[1]}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={2}>
                                    <SentimentSatisfiedIcon style={{ color: "#797445"}} className="mb-2"/>
                                </Col>
                                <Col sm={10} className="pt-2">
                                    <BorderLinearProgress variant="determinate" value={percent[2]}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={2}>
                                    <SentimentDissatisfiedIcon style={{ color: "#af5245"}} className="mb-2"/>
                                </Col>
                                <Col sm={10} className="pt-2">
                                    <BorderLinearProgress variant="determinate" value={percent[3]}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={2}>
                                    <SentimentVeryDissatisfiedIcon style={{ color: "#dc3545"}} className="mb-2"/>
                                </Col>
                                <Col sm={10} className="pt-2">
                                    <BorderLinearProgress variant="determinate" value={percent[4]}/>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col md="7" lg="8" style={{padding: "0 0.75rem"}}>
                    <div className="rounded-10 bg-white p-5 pb-4 mb-4 text-center">
                        <Row className="mb-3 m-0">
                            <h3 className="mb-4 mr-auto">Reviews</h3>
                            <Editable reversed>
                                <div style={{paddingRight: "15px"}}>
                                    {authUser ?
                                        <i className="fas fa-plus p-3" id="add-exp" onClick={this.toggleModal}/> : null}
                                </div>
                            </Editable>
                        </Row>
                        <Row className="m-0 text-justify">
                            {reviews.map(review => <Review2 key={review.id} review={review} rerender={this.rerender}
                                                                        del={this.deleteReview} edit={this.editReview}/>)}
                        </Row>
                        <Editable reversed>
                            <FormModal isOpen={this.state.isModalOpen} toggle={this.toggleModal} submit={this.handleSubmit}
                                       fields={reviewsFormFields} title="Add a review" content={{
                                review: "",
                                rating: 5}}
                                       validators={reviewValidators} validatorsDefault={reviewValidatorsDefault}
                            />
                        </Editable>

                        {this.state.pages > 3 ?
                            <ReactPaginate
                                previousLabel={"❮"}
                                nextLabel={"❯"}
                                forcePage={this.state.currentPage}
                                pageCount={Math.ceil(this.state.pages/3)}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                previousLinkClassName={"pagination-change"}
                                nextLinkClassName={"pagination-change"}
                                disabledClassName={"pagination-change-disabled"}
                                activeLinkClassName={"pagination-active"}
                                breakClassName={"pagination-break"}
                            /> : null}
                    </div>
                </Col>
            </Row>
        )
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Reviews);