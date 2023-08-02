import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
/* Context */
import { UserContext } from "../../context/UserContext";
//Components
import SignTitle from "../../components/other/SignTitle";
//Images
import signImage from "../../assets/img/sign_in_img.png";
import Input from "../../components/api_form/inputs/Input";
import SubmitButton from "../../components/inputs/SubmitButton";
import axios from "axios";

const SignIn = () => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const config = {
    method: "post",
    url: "http://localhost:3002/signin",
    data: {
      login,
      password,
    },
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      axios(config)
        .then((result) => {
          console.log(result);
          if (result.data.loggedIn) {
            setToken(result.data.data);
            setError("");
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
          setError(error.response.data.error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign sign-in">
      <SignTitle img={signImage} title="Sign In" japanTitle="繋がり" />
      <form className="sign-form sign-in-form" onSubmit={(e) => formSubmit(e)}>
        <div className="sign-form-top">
          <div className="sign-inputs">
            <Input
              borderColor="#798b91"
              name="Pseudo : Email"
              setState={setLogin}
              state={login}
            />
            <Input
              borderColor="#798b91"
              name="Password"
              setState={setPassword}
              state={password}
            />
          </div>
          <SubmitButton name="Sign In" />
        </div>
        <div className="form-error">{error}</div>
      </form>
    </div>
  );
};

export default SignIn;
