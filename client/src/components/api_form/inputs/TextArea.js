import React from "react";

const TextArea = (props) => {
  return (
    <div>
      <div className="api-form-text-container">
        <h2>{props.name}</h2>
        <textarea
          value={props.state}
          onChange={(e) => props.setState(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default TextArea;
