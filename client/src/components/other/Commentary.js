import React, { useContext, useEffect, useState } from "react";
//Components
import TitleInput from "../api_form/inputs/Input";
import TextInput from "../api_form/inputs/TextArea";
import Comment from "./Comment";
//Icons
import AddCommentIcon from "@mui/icons-material/AddComment";
import SubmitButton from "../inputs/SubmitButton";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    axios(config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setNewComments((newComments) => [
      ...newComments,
      { title: title, commentary: commentary, user_id: getToken()?.id },
    ]);
    setToggleCommentaryForm(false);
  }

  const fetchAllComments = async (product_id) => {
    const endpoint = `http://localhost:3002/commentary/${product_id}?type=${props.type}`;
    return await (
      await axios.get(endpoint)
    ).data;
  };

  useEffect(() => {
    fetchAllComments(props.productId)
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
