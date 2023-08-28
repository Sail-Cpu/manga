import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
/* Context */
import { UserContext } from "../../context/UserContext";
//Components
import SignTitle from "../../components/other/SignTitle";
//Images
import signImage from "../../assets/img/sign_up_img.png";
import Input from "../../components/api_form/inputs/Input";
import SubmitButton from "../../components/inputs/SubmitButton";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [pseudo, setPseudo] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const config = {
    method: "post",
    url: "http://localhost:3002/signup",
    data: {
      email,
      pseudo,
      password,
    },
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      axios(config)
        .then((result) => {
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
    <div className="sign sign-up">
      <SignTitle img={signImage} title="INSCRIPTION" japanTitle="登録" />
      <form className="sign-form sign-up-form" onSubmit={(e) => formSubmit(e)}>
        <div className="sign-form-top">
          <div className="sign-inputs">
            <Input
              borderColor="#798b91"
              name="Email"
              setState={setEmail}
              state={email}
              iType="email"
            />
            <Input
              borderColor="#798b91"
              name="Pseudo"
              setState={setPseudo}
              state={pseudo}
            />
            <Input
              borderColor="#798b91"
              name="Mot de passe"
              setState={setPassword}
              state={password}
              iType="password"
            />
          </div>
          <SubmitButton name="Sign Up" />
        </div>
        <div className="form-error">{error}</div>
        <div className="sign-link">
          <button onClick={() => navigate("/sign/signin")}>CONNEXION</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
