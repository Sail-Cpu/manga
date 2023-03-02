import React, { useState } from "react";
//Components
import ApiNavBar from "../../components/api_form/navigation/ApiNavBar";
import ApiFormTitle from "../../components/api_form/ApiFormTitle";
//form
import ImageCreate from "../../components/api_form/form/image/ImageCreate";

const DataForm = () => {

    const [form, setForm] = useState('CREATE_IMAGE');
    
    return(
        <div className="data-form-container">
            <ApiNavBar setForm={setForm}/>
            <form className="data-form">
                <div className="data-form-title-container">
                    <ApiFormTitle name={form.replace('_', ' : ')} />
                </div>
                {form === 'CREATE_IMAGE' &&
                    <ImageCreate />
                }
            </form>
        </div>
    )
}

export default DataForm;