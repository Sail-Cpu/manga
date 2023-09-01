import React, { useState } from "react";
//Components
import SearchRow from "../../inputs/SearchRow";
import SubmitButton from "../../../inputs/SubmitButton";
//Api
import { get, deleteRow } from "../../../../api/ApiManga";

const ImageDelete = () => {
  const [data, setData] = useState();
  const [message, setMessage] = useState("");

  const deleteImage = (e) => {
    e.preventDefault();
    deleteRow
      .deleteImage(data?.id)
      .then((response) => {
        setMessage(response?.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="api-form-container" onSubmit={(e) => deleteImage(e)}>
      <SearchRow data={data} setData={setData} fetchData={get.fetchImages} />
      <span style={{ color: "green" }}>{message}</span>
      <div className="form-button-container">
        <SubmitButton name="DELETE" />
      </div>
    </form>
  );
};

export default ImageDelete;
