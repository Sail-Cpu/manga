import React from "react";

const Input = (props) => {
  return (
    <div className="api-form-input-container">
      <h2>{props.name}</h2>
      <input
        type={props.iType}
        style={{ borderColor: props.borderColor }}
        value={props.state}
        onChange={(e) => props.setState(e.target.value)}
      />
    </div>
  );
};

export default Input;
