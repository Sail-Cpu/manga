import React from "react";
//Components
import ApiFormTabs from "./ApiFormTabs";

const ApiNavBar = (props) => {

    const tabs = ['IMAGE', 'AUTHOR'];
    const submenu = ['CREATE', 'MODIFY', 'DELETE'];

    return(
        <div className="api-nav-bar">
            <div className="api-nav">
                {tabs.map((tab, index) => {
                    return(
                        <ApiFormTabs key={index} name={tab} submenu={submenu} setForm={props.setForm}/>
                    )
                })}
            </div>
        </div>
    )
}

export default ApiNavBar;