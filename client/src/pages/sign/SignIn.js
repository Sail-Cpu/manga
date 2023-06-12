import React from 'react'
//Components
import SignTitle from "../../components/other/SignTitle";
//Images
import signImage from "../../assets/img/sign_in_img.png";
import Input from "../../components/api_form/inputs/Input";
import SubmitButton from "../../components/inputs/SubmitButton";

const SignIn = () => {
    return (
        <div className="sign sign-in">
            <SignTitle img={signImage} title="Sign In" japanTitle="繋がり"/>
            <form className="sign-form sign-in-form">
                <div className="sign-inputs">
                    <Input borderColor="#798b91" name="Pseudo : Email"/>
                    <Input borderColor="#798b91" name="Password"/>
                </div>
                <SubmitButton name="Sign In"/>
            </form>
        </div>
    )
}

export default SignIn;