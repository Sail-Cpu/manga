import React from "react";

const SignTitle = (props) => {
  return (
    <div className="sign-title">
      <span className="sign-top-name">{props.title}</span>
      <img alt="Sign img" src={props.img} />
      <span className="sign-bottom-name">{props.japanTitle}</span>
    </div>
  );
};

export default SignTitle;
