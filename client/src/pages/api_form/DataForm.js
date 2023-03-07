import React, { useState } from "react";
//Components
import ApiNavBar from "../../components/api_form/navigation/ApiNavBar";
import ApiFormTitle from "../../components/api_form/ApiFormTitle";
//Form
import ImageCreate from "../../components/api_form/form/image/ImageCreate";
import ImageDelete from "../../components/api_form/form/image/ImageDelete";

const DataForm = () => {

    const [form, setForm] = useState('CREATE_IMAGE');
    
    return(
        <div className="data-form-container">
            <ApiNavBar setForm={setForm}/>
            <div className="data-form">
                <div className="data-form-title-container">
                    <ApiFormTitle name={form.replace('_', ' : ')} />
                </div>
                <div className="data-form-content" style={{display: form === 'CREATE_IMAGE' ? 'flex' : 'none'}}>
                    <ImageCreate/>
                </div>
                <div className="data-form-content" style={{display: form === 'DELETE_IMAGE' ? 'flex' : 'none'}}>
                    <ImageDelete />
                </div>
            </div>
        </div>
    )
}

export default DataForm;