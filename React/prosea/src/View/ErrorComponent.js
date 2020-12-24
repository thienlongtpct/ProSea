import React from "react";
import Footer from "../Components/FooterComponent";

function Error(props) {
    return(
        <>
            <p>This path isn't existed, please return to: {props.link}</p>
        </>
    );
}

export default Error;