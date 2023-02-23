import React from "react";

const Input = (props) => {
    return(
        <div className="api-form-input-container">
            <h2>{props.name}</h2>
            <input type='text' />
        </div>
    )
}

export default Input;