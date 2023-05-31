import React, { useState } from "react";
//Components
import Input from "../../inputs/Input";
import Select from "../../inputs/Select";
import SubmitButton from "../../../inputs/SubmitButton";
//Api
import { post } from "../../../../api/Api";

const ImageCreate = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("background");
  const [error, setError] = useState("");
  const [good, setGood] = useState("");

  const values = ["background", "logo", "poster"];

  const CreateImage = (e) => {
    e.preventDefault();
    post
      .postImage(name, link, type)
      .then((response) => {
        if (response.data.error) {
          setGood("");
          setError(response.data.error);
        } else {
          setError("");
          setGood(response.data.message);
          setName("");
          setLink("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="api-form-container" onSubmit={(e) => CreateImage(e)}>
      <div className="inputs-list">
        <div className="api-form">
          <Input name="Name" state={name} setState={setName} />
          <Input name="Link" state={link} setState={setLink} />
          <Select name="Type" values={values} state={setType} />
        </div>
        <div
          className="api-form-img"
          style={{ backgroundImage: `url(${link})` }}
        ></div>
      </div>
      <span style={{ color: "red" }}>{error}</span>
      <span style={{ color: "green" }}>{good}</span>
      <div className="form-button-container">
        <SubmitButton name="CREATE" />
      </div>
    </form>
  );
};

export default ImageCreate;
