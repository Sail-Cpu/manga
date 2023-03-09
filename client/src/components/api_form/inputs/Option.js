import React from "react";

const Option = (props) => {

    return(
        <div className="api-form-input-container">
            <h2>{props.name}</h2>
            <select className="select-form" value={props.currentValue} name="choice" onChange={(e) => props.state(e.target.value)}>
            {
                props.values.map((value, idx) => {
                    return(
                       <option className="select-form-option" key={idx} value={value}>{value}</option>   
                    )
                })
            }
            </select>
        </div>
    )
}

export default Option;