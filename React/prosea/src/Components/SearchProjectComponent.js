import React, {Component} from "react";
import "../CSS/SearchProject.css";

class SearchProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleChange(event) {
        this.setState({
            query: event.target.value
        });
    }

    handleEnter(event) {
        if (event.key === 'Enter') {
            this.props.changePrefix(this.state.query);
        }
    }

    render() {
        return <div className="border search-project"
             style={{
                 borderRadius: "10rem",
                 height: "40px",
                 backgroundColor: "#ffffff",
             }}>
            <div className="d-flex">
                <i className="fas fa-search ml-3 mr-2 mt-auto mb-auto"
                   style={{
                       fontSize: "15px",
                       color: "#495057",
                       verticalAlign: "middle",
                       display: "inline"
                   }}/>
                <input type="text" placeholder={this.props.placeholder}
                       className="mr-3"
                       onChange={this.handleChange}
                       onKeyDown={this.handleEnter}
                />
            </div>
        </div>
    }
}

export default SearchProject;