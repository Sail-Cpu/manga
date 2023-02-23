import React from "react";
//Components
import Input from "../../inputs/Input";
import SubmitButton from "../../../inputs/SubmitButton";

const ImageCreate = () => {
    return(
        <form className="api-form-container">
            <div className="api-form">
                <Input name="Name"/>
                <Input name="Link"/>
            </div>
        <SubmitButton name="CREATE" />
        </form>
    )
}

export default ImageCreate;