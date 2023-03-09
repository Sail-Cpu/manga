import React, {useEffect, useState} from 'react';
//Components
import Input from "../../inputs/Input";
import Select from "../../inputs/Select";
import SubmitButton from "../../../inputs/SubmitButton";
import SearchRow from "../../inputs/SearchRow";
import {get} from "../../../../api/Api";
//Api
import { patch } from '../../../../api/Api';
const ImageModify = () => {

    const values = ['background', 'logo', 'poster'];

    const [id, setId] = useState();
    const [name, setName] = useState();
    const [link, setLink] = useState()
    const [error, setError] = useState('');
    const [data, setData] = useState();
    const [good, setGood] = useState('');
    const [type, setType] = useState();

    useEffect(() => {
        setId(data?.id);
        setName(data?.name);
        setLink(data?.link);
        setType(data?.type);
    }, [data])

    const modifyImage = (e) => {
        e.preventDefault();
        patch.patchImage(id, name, link, type).then(response => {
            if(response.data?.error){
                setGood('');
                setError(response.data?.error);
            }else{
                setError('');
                setGood(response.data?.message);
            }
            console.log(response)
        }).catch(error => {
            console.log(error);
        })
    }

    return(
        <form className="api-form-container" onSubmit={(e) => modifyImage(e)}>
            <SearchRow data={data} setData={setData} fetchData={get.fetchImages} />
            {data &&
                <>
                    <div className="inputs-list">
                        <div className="api-form">
                            <Input name="Name" state={name} setState={setName} />
                            <Input name="Link" state={link} setState={setLink} />
                            <Select name="Type" currentValue={type} values={values} state={setType}/>
                        </div>
                        <div className="api-form-img" style={{backgroundImage: `url(${link})`}}></div>
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

export default ImageModify;