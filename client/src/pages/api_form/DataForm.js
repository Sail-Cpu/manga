import React, { useState } from "react";
//Components
import ApiNavBar from "../../components/api_form/navigation/ApiNavBar";
//Form
import ImageCreate from "../../components/api_form/form/image/ImageCreate";
import ImageDelete from "../../components/api_form/form/image/ImageDelete";
import ImageModify from "../../components/api_form/form/image/ImageModify";
import AuthorCreate from "../../components/api_form/form/author/AuthorCreate";

const DataForm = () => {

    const [form, setForm] = useState('CREATE_IMAGE');
    
    return(
        <div className="data-form-container">
            <ApiNavBar setForm={setForm}/>
            <div className="data-form">
                <div className="data-form-title-container">
                    <div className="api-form-title">
                        <h1>{form.replace('_', ' : ')}</h1>
                    </div>
                </div>

                <div className="data-form-content" style={{display: form === 'CREATE_IMAGE' ? 'flex' : 'none'}}>
                    <ImageCreate />
                </div>
                <div className="data-form-content" style={{display: form === 'DELETE_IMAGE' ? 'flex' : 'none'}}>
                    <ImageDelete />
                </div>
                <div className="data-form-content" style={{display: form === 'MODIFY_IMAGE' ? 'flex' : 'none'}}>
                    <ImageModify />
                </div>

                <div className="data-form-content" style={{display: form === 'CREATE_AUTHOR' ? 'flex' : 'none'}}>
                    <AuthorCreate />
                </div>

            </div>
        </div>
    )
}

export default DataForm;