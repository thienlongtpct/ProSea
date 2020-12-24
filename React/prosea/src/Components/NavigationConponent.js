import React, {Component} from "react";

import {Nav, Navbar, Container, Dropdown, DropdownButton, NavDropdown} from "react-bootstrap";
import {withRouter} from "react-router-dom";

import "../CSS/Navigation.css";
import SearchProject from "./SearchProjectComponent";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: "DateAsc",
            search: false
        }
        this.toggleSearch = this.toggleSearch.bind(this);
        this.toggleSort = this.toggleSort.bind(this);
    }

    toggleSearch() {
        this.setState({
            search: !this.state.search
        })
    }

    toggleSort(eventKey, event) {
        event.preventDefault();
        this.setState({sort: eventKey});
        this.props.toggleSort(eventKey);
    }

    render() {
        const navDropdownTitle = (<>More <i className="fas fa-caret-down ml-2"/></>);
        return (
            <div className="w-100 navigation" style={{backgroundColor: "white", marginBottom: "1.25rem"}}>
                <Container className="max-screen">
                    <Navbar as="nav" className="p-0">
                        <Nav activeKey={this.props.activeItem} className="w-100 user-select-none">
                            {
                                this.props.navItems.map(item => (
                                (item.type === "dropdown") ?

                                    <NavDropdown title={navDropdownTitle}
                                                 className="nav-dropdown rounded mr-4" key={item.id}>
                                        {item.items.map(item =>
                                            <NavDropdown.Item as="a" eventKey={item.link} key={item.id}
                                                              onSelect={() => this.props.history.push("./" + item.link)}>
                                                {item.name}
                                            </NavDropdown.Item>)
                                        }
                                    </NavDropdown> :
                                    <Nav.Item key={item.id} as="li">
                                        <Nav.Link as="a" onSelect={() => this.props.history.push("./" + item.link)} eventKey={item.link}>
                                        {item.name}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                        </Nav>
                        {this.props.activeItem === "projects" || this.props.activeItem === "bookmark" ?
                            <>
                                {this.state.search ?
                                    <SearchProject placeholder="Find other projects" toggleFilter={this.props.toggleFilter} changePrefix={this.props.changePrefix}/>:
                                    <div className="feature" onClick={this.toggleSearch}>
                                        <i className="fas fa-search"/>
                                    </div>
                                }
                                <div className="feature ml-2 mr-2" onClick={this.props.toggleFilter}>
                                    <i className="fas fa-filter"/>
                                </div>
                                <DropdownButton
                                    alignRight
                                    title={<i className="fas fa-sort" style={{fontSize: "13px"}}/>}>
                                    <Dropdown.Item eventKey="DateAsc"
                                                   active={this.state.sort === "DateAsc"}
                                                   onSelect={this.toggleSort}>Date created<i className="ml-2 fas fa-sort-numeric-up-alt"/>
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="DateDesc"
                                                   active={this.state.sort === "DateDesc"}
                                                   onSelect={this.toggleSort}>Date created<i className="ml-2 fas fa-sort-numeric-down-alt"/>
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="SalaryAsc"
                                                   active={this.state.sort === "SalaryAsc"}
                                                   onSelect={this.toggleSort}>Salary<i className="ml-2 fas fa-sort-numeric-up-alt"/>
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="SalaryDesc"
                                                   active={this.state.sort === "SalaryDesc"}
                                                   onSelect={this.toggleSort}>Salary<i className="ml-2 fas fa-sort-numeric-down-alt"/>
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="DeadlineAsc"
                                                   active={this.state.sort === "DeadlineAsc"}
                                                   onSelect={this.toggleSort}>Deadline<i className="ml-2 fas fa-sort-numeric-up-alt"/>
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="DeadlineDesc"
                                                   active={this.state.sort === "DeadlineDesc"}
                                                   onSelect={this.toggleSort}>Deadline<i className="ml-2 fas fa-sort-numeric-down-alt"/>
                                    </Dropdown.Item>
                                </DropdownButton>
                            </> :
                            null}
                    </Navbar>
                </Container>
            </div>
        );
    }
}

export default withRouter(Navigation);