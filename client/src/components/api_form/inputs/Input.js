import React from "react";

const Input = (props) => {
  return (
    <div className="api-form-input-container">
      <h2>{props.name}</h2>
      <input
        type="text"
        style={props.borderColor ? { borderColor: props.borderColor } : {}}
        value={props.state}
        onChange={(e) => props.setState(e.target.value)}
      />
    </div>
  );
};

export default Input;
