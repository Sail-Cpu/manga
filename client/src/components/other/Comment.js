import React, { useEffect, useState } from "react";
import axios from "axios";
//Api
import { User } from "../../api/ApiUser";

const Comment = (props) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    if (props.datas) {
      User.fetchUserById(props.datas?.user_id)
        .then((response) => {
          setUser(response.user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.datas]);

  return (
    <div className="comment-container">
      <div className="comment-top">
        <div className="comment-top-user-image"></div>
        <h3>{user.pseudo}</h3>
      </div>
      <div className="comment-title">
        <h2>{props.datas?.title}</h2>
      </div>
      <div className="comment-text">
        <p>{props.datas?.commentary}</p>
      </div>
    </div>
  );
};

export default Comment;
