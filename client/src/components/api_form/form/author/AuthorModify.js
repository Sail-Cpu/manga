import React, {useEffect, useState} from 'react';
//Components
import Input from "../../inputs/Input";
import TextArea from "../../inputs/TextArea";
import SubmitButton from "../../../inputs/SubmitButton";
import SearchRow from "../../inputs/SearchRow";
import {get} from "../../../../api/Api";
//Api
import { patch } from '../../../../api/Api';
const AuthorModify = () => {

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [biography, setBiography] = useState()
    const [error, setError] = useState('');
    const [data, setData] = useState();
    const [good, setGood] = useState('');

    useEffect(() => {
        setId(data?.id);
        setName(data?.name);
        setBiography(data?.biography);
    }, [data])

    const modifyAuthor = (e) => {
        e.preventDefault();
        patch.patchAuthor(id, name, biography).then(response => {
            if(response.data?.error){
                setGood('');
                setError(response.data?.error);
            }else{
                setError('');
                setGood(response.data?.message);
            }
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }

    return(
        <form className="api-form-container" onSubmit={(e) => modifyAuthor(e)}>
            <SearchRow data={data} setData={setData} fetchData={get.fetchAuthor} />
            {data &&
                <>
                    <div className="inputs-list">
                        <div className="api-form">
                            <Input name="Name" state={name} setState={setName} />
                            <TextArea name="Biography" state={biography} setState={setBiography} />
                        </div>
                    </div>
                    <span style={{color: 'red'}}>{error}</span>
                    <span style={{color: 'green'}}>{good}</span>
                    <div className="form-button-container">
                        <SubmitButton name="MODIFY"/>
                    </div>
                </>
            }
        </form>
    )
}

export default AuthorModify;