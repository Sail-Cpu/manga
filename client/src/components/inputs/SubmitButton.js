import React from "react";

const SubmitButton = (props) => {
    return(
        <div className="submit-button-container">
            <div className="submit-button-icon-container">
                <div className="submit-button-icon"></div>
            </div>
            <div className="submit-button">
                {props.name}
            </div>
        </div>
    )
}

export default SubmitButton;