import React, {Component} from "react";

import {Container, Jumbotron, Image} from "react-bootstrap";

import Header from "../Components/HeaderComponent";
import {connect} from "react-redux";
import ProjectFilter from "../Components/ProjectFilterComponent";
import ReactPaginate from "react-paginate";
import Projects from "../Components/ProjectsComponent";
import SearchProject from "../Components/SearchProjectComponent";
import Footer from "../Components/FooterComponent";

const mapStoreToProps = state => {
    return {
        user: state.user.user,
        projects: state.projects
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            pages: 0,
            isFilterOpen: false,
            sort: "DateAsc",
            filter: null
        }
        this.toggleFilter = this.toggleFilter.bind(this);
        this.changePrefix = this.changePrefix.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    toggleFilter() {
        this.setState({isFilterOpen: !this.state.isFilterOpen, currentPage: 0});
    }

    changePrefix(prefix) {
        this.setState({prefix: prefix, isFilterOpen: true});
    }

    handleFilter(filter) {
        this.setState({filter: filter, isFilterOpen: !this.state.isFilterOpen});
    }

    handlePageClick(selectedPage) {
        this.setState({currentPage: selectedPage.selected});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.projects.size != null && this.props.projects.size !== prevState.pages)
            this.setState({pages: this.props.projects.size});
    }

    render() {
        return (
            <>
                <Header/>
                <Jumbotron style={{
                    backgroundColor: "#3B5998",
                    borderRadius: "0"
                }}>
                    <Container className="text-center">
                        <Image src="Images/name.png" width="300px"/>
                        <br/>
                        <Image src="Images/slogan.png" width="350px"/>
                        <p className="lead text-white">
                            Find some interesting project to collaborate with, or discover the big open sources.
                        </p>
                    </Container>
                </Jumbotron>
                <Container className="max-screen my-5" style={{overFlow: "visible"}}>
                    <SearchProject placeholder="Find other projects in ProSea" toggleFilter={this.state.toggleFilter} changePrefix={this.changePrefix}/>
                    <ProjectFilter isOpen={this.state.isFilterOpen} prefix={this.state.prefix} toggle={this.toggleFilter} filter={this.handleFilter}/>
                    <div className="text-center pt-5" style={{overFlow: "visible"}}>
                        <ReactPaginate
                            previousLabel={"❮"}
                            nextLabel={"❯"}
                            forcePage={this.state.currentPage}
                            pageCount={Math.ceil(this.state.pages/6)}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            previousLinkClassName={"pagination-change"}
                            nextLinkClassName={"pagination-change"}
                            disabledClassName={"pagination-change-disabled"}
                            activeLinkClassName={"pagination-active"}
                            breakClassName={"pagination-break"}
                        />
                    </div>
                    <Projects pageNum={this.state.currentPage} sort={this.state.sort} filter={this.state.filter} all/>
                </Container>
                <Footer/>
            </>
        )
    }
}

export default connect(mapStoreToProps, null)(Home);