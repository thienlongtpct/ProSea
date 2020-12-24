import React, {Component} from "react";
import Navigation from "./NavigationConponent";
import {Container} from "react-bootstrap";
import Projects from "./ProjectsComponent";
import ProjectFilter from "./ProjectFilterComponent";
import {connect} from "react-redux";
import ReactPaginate from "react-paginate";
import "../CSS/Pagination.css";

const mapStoreToProps = state => {
    return {
        user: state.user.user,
        projects: state.projects
    }
}

class UserProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFilterOpen: false,
            prefix: "",
            sort: "DateAsc",
            isBookmark: this.props.active === "bookmark",
            filter: null,
            currentPage: 0,
            pages: 0
        }
        this.toggleSort = this.toggleSort.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.changePrefix = this.changePrefix.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        window.scrollTo(0,0);
    }

    toggleSort(type) {
        this.setState({sort: type, currentPage: 0});
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
                <Navigation navItems={this.props.navItems} activeItem={this.props.active}
                            toggleFilter={this.toggleFilter} toggleSort={this.toggleSort}
                            changePrefix={this.changePrefix}
                />
                <Container className="max-screen pb-5 text-center">
                    <ProjectFilter isOpen={this.state.isFilterOpen} prefix={this.state.prefix} toggle={this.toggleFilter} filter={this.handleFilter}/>
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
                    <Projects pageNum={this.state.currentPage} sort={this.state.sort} filter={this.state.filter} isBookmark={this.state.isBookmark}/>
                </Container>
            </>
        )
    }
}

export default connect(mapStoreToProps, null)(UserProjects);