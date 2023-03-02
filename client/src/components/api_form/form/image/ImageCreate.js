import React, { useState } from "react";
//Components
import Input from "../../inputs/Input";
import Option from '../../inputs/Option';
import SubmitButton from "../../../inputs/SubmitButton";
//Api
import {post} from '../../../../api/Api';

const ImageCreate = () => {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [type, setType] = useState('background');
    const [error, setError] = useState('');
    const [good, setGood] = useState('')
 
    const values = ['background', 'logo', 'poster'];

    const Submit = () => {
        post.postImage(name, link, type)
        .then(response => {
            console.log(response.data)
            if(response.data.error){
                setGood('');
                setError(response.data.error);
            }else{
                setError('');
                setGood(response.data.message);
                setName('');
                setLink('');
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <form className="api-form-container">
            <div className="inputs-list">
                <div className="api-form">
                    <Input name="Name" state={name} setState={setName} />
                    <Input name="Link" state={link} setState={setLink} />
                    <Option name="Type" values={values} state={setType}/>
                </div>
                <div className="api-form-img" style={{backgroundImage: `url(${link})`}}></div>
                
            </div>
            <span style={{color: 'red'}}>{error}</span>
            <span style={{color: 'green'}}>{good}</span>
            <div className="form-button-container">
                <SubmitButton name="CREATE" submit={Submit}/>
            </div>
        </form>
    )
}

export default ImageCreate;