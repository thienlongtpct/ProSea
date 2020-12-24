import React, {Component} from "react";

class Loading extends Component {
    render() {
        return (
            <div style={{width: "100%", height: "10000px", position: "fixed !important"}} className="text-center align-middle p-5">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"/>
                <p>Loading . . .</p>
            </div>
        );
    }
}

export default Loading;