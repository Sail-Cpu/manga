import React, {useRef, useState} from "react";
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

    const config = {
        method: 'post',
        url: "http://localhost:3002/users",
        data: {
            email,
            pseudo,
            password
        }
    }


    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            axios(config).then((result) => {
                if (result.data.loggedIn) {
                    /*Le code de connection mais d'abord gerer le context.*/
                    setError("");
                }
            }).catch((error) => {
                console.log(error);
                setError(error.response.data.error);
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="sign sign-up">
            <SignTitle img={signImage} title="Sign Up" japanTitle="登録"/>
            <form className="sign-form sign-up-form" onSubmit={(e) => formSubmit(e)}>
                <div className="sign-inputs">
                    <Input borderColor="#798b91" name="Email" setState={setEmail}/>
                    <Input borderColor="#798b91" name="Pseudo" setState={setPseudo}/>
                    <Input borderColor="#798b91" name="Password" setState={setPassword}/>
                </div>
                <SubmitButton name="Sign Up"/>
                <div className="form-error">{error}</div>
            </form>

        </div>
    );
};

export default SignUp;
