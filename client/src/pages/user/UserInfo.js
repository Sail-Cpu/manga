import React from "react";
import { Link } from "react-router-dom";

const UserInfo = (props) => {
  return (
    <div className="user-info">
      <div className="user-info-left">
        <div className="user-info-picture">{props.pseudo[0].toUpperCase()}</div>
      </div>
      <div className="user-info-right">
        <span>{props.pseudo}</span>
        <span>{props.email}</span>
        <Link to="/user/usermodif">
          <span className="user-info-link">Modif Info</span>
        </Link>
        <span className="user-info-link">Get Api Key</span>
      </div>
    </div>
  );
};

export default UserInfo;
