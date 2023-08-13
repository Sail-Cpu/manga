import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
//Api
import { User, commentary, UserCommentary } from "../../api/ApiUser";
import { useNavigate } from "react-router-dom";
//Context
import { UserContext } from "../../context/UserContext";
//Components
import TitleInput from "../api_form/inputs/Input";
import TextInput from "../api_form/inputs/TextArea";
import Comment from "./Comment";
import SubmitButton from "../inputs/SubmitButton";
//Icons
import AddCommentIcon from "@mui/icons-material/AddComment";

const Commentary = (props) => {
  const { getToken } = useContext(UserContext);
  const navigate = useNavigate();

  const [toggleCommentaryForm, setToggleCommentaryForm] = useState(false);
  const [title, setTitle] = useState("");
  const [commentary, setCommentary] = useState("");

  const [newComments, setNewComments] = useState([]);
  const [allComments, setAllComments] = useState([]);

  const config = {
    method: "post",
    url: "http://localhost:3002/commentary",
    data: {
      type: props.type,
      user_id: getToken()?.id,
      product_id: props.productId,
      title: title,
      commentary: commentary,
    },
  };

  function submitCommentary(e) {
    e.preventDefault();
    UserCommentary(
      getToken()?.id,
      config,
      setNewComments,
      newComments,
      title,
      commentary,
      setToggleCommentaryForm
    );
  }

  useEffect(() => {
    User.fetchAllComments(props.productId, props.type)
      .then((response) => {
        setAllComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.productId]);

  return (
    <div className="commentary-container">
      <h1>Commentaries :</h1>
      <AddCommentIcon
        onClick={() =>
          getToken()
            ? setToggleCommentaryForm(!toggleCommentaryForm)
            : navigate("/sign/signin")
        }
      />
      {toggleCommentaryForm && (
        <form className="comment-form" onSubmit={(e) => submitCommentary(e)}>
          <TitleInput name="Title" setState={setTitle} state={title} />
          <TextInput
            name="Comment"
            setState={setCommentary}
            state={commentary}
          />
          <SubmitButton name="Submit" />
        </form>
      )}
      {newComments.length > 0 && <Comment datas={newComments[0]} />}
      {allComments.map((comment, idx) => {
        return <Comment key={idx} datas={comment} />;
      })}
    </div>
  );
};

export default Commentary;
