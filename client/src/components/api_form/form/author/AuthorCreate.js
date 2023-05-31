import React, { useState } from "react";
//Components
import Input from "../../inputs/Input";
import TextArea from "../../inputs/TextArea";
import SubmitButton from "../../../inputs/SubmitButton";
//Api
import { post } from "../../../../api/Api";

const AuthorCreate = () => {
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [error, setError] = useState("");
  const [good, setGood] = useState("");

  const CreateAuthor = (e) => {
    e.preventDefault();
    post
      .postAuthor(name, biography)
      .then((response) => {
        if (response.data?.error) {
          setGood("");
          setError(response.data?.error);
        } else {
          setError("");
          setGood(response.data?.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="api-form-container" onSubmit={(e) => CreateAuthor(e)}>
      <div className="inputs-list">
        <div className="api-form">
          <Input name="Name" state={name} setState={setName} />
          <TextArea
            name="Biography"
            state={biography}
            setState={setBiography}
          />
        </div>
      </div>
      <span style={{ color: "red" }}>{error}</span>
      <span style={{ color: "green" }}>{good}</span>
      <div className="form-button-container">
        <SubmitButton name="CREATE" />
      </div>
    </form>
  );
};

export default AuthorCreate;
