import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//Context
import { UserContext } from "../../context/UserContext";
//Components
import Input from "../../components/api_form/inputs/Input";

const UserModif = () => {
  const { getToken } = useContext(UserContext);

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const config = {
    method: "patch",
    url: "http://localhost:3002/user",
    data: {
      user_id: getToken()?.id,
      mail: mail,
      password: password,
      confirmPassword: confirmPassword,
    },
  };

  const SubmitUserModif = (e) => {
    e.preventDefault();
    axios(config)
      .then((response) => {
        console.log(response);
        setError("");
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        setMessage("");
        setError(error.response.data.error);
      });
  };

  return (
    <div className="user-modif-page">
      <Link to="/user">
        <button>Return</button>
      </Link>
      <div className="user-modif">
        <h1>Modif info</h1>
        <div className="user-modif-picture">
          {getToken()?.pseudo?.[0].toUpperCase()}
        </div>
        <form className="user-modif-form" onSubmit={(e) => SubmitUserModif(e)}>
          <Input
            name="Mail"
            borderColor="#798b91"
            state={mail}
            setState={setMail}
          />
          <Input
            name="Password"
            borderColor="#798b91"
            state={password}
            setState={setPassword}
          />
          <Input
            name="Confirm Password"
            borderColor="#798b91"
            state={confirmPassword}
            setState={setConfirmPassword}
          />
          <button type="submit">Valider</button>
        </form>
        {message.length > 0 ? (
          <span style={{ color: "green" }}>{message}</span>
        ) : (
          <span style={{ color: "red" }}>{error}</span>
        )}
      </div>
    </div>
  );
};

export default UserModif;
