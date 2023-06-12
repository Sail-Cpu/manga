import React from 'react'
//Components
import SignTitle from "../../components/other/SignTitle";
//Images
import signImage from "../../assets/img/sign_in_img.png";
import Input from "../../components/api_form/inputs/Input";
import SubmitButton from "../../components/inputs/SubmitButton";

const SignUp = () => {
    return (
        <div className="sign sign-up">
            <SignTitle img={signImage} title="Sign Up" japanTitle="登録"/>
            <form className="sign-form sign-up-form">
                <div className="sign-inputs">
                    <Input borderColor="#798b91" name="Email"/>
                    <Input borderColor="#798b91" name="Pseudo"/>
                    <Input borderColor="#798b91" name="Password"/>
                </div>
                <SubmitButton name="Sign Up"/>
            </form>
        </div>
    )
}

export default SignUp;