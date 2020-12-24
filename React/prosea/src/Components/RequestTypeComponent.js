import React, {Component} from "react";

import "../CSS/Request.css";

class RequestType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "all"
        }
        this.changeType = this.changeType.bind(this);
    }

    changeType(type) {
        this.setState({active: type}, () => this.props.changeType(type));
    }

    render() {
        return (
            <div className="contact border rounded-10 mb-4 p-4 bg-white">
                <div className={"my-3 px-3 pt-2 request-type rounded "+(this.state.active === "all" ? "active": "")}
                     onClick={() => this.changeType("all")}>
                    <strong>All requests</strong>
                </div>
                <hr/>
                <div className={"my-3 px-3 py-2 request-type rounded "+(this.state.active === "project" ? "active": "")}
                     onClick={() => this.changeType("project")}>
                    <strong>Join Project Requests</strong>
                </div>
                {this.props.type === "company" ?
                    <div
                        className={"my-3 px-3 py-2 request-type rounded " + (this.state.active === "apply" ? "active" : "")}
                        onClick={() => this.changeType("apply")}>
                        <strong>Apply Requests</strong>
                    </div> :
                    <div
                        className={"my-3 px-3 py-2 request-type rounded " + (this.state.active === "offer" ? "active" : "")}
                        onClick={() => this.changeType("offer")}>
                        <strong>Offer Requests</strong>
                    </div>
                }
            </div>
        )
    }
}

export default RequestType;