import React from "react";

const SubmitButton = (props) => {
  return (
    <button className="submit-button-container" type="submit">
      <div className="submit-button-icon-container">
        <div className="submit-button-icon"></div>
      </div>
      <div className="submit-button">{props.name}</div>
    </button>
  );
};

export default SubmitButton;
