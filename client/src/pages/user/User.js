import React, {useContext, useState} from "react";
import {UserContext} from "../../context/UserContext";
//Components
import UserNav from "../../components/navigation/UserNav";
import UserInfo from "./UserInfo";

const User = () => {

    const {getToken} = useContext(UserContext);

    const [activeTab, setActiveTab] = useState("profil");

    return (
        <div className="user-page">
            <div className="user-page-top">
                <button>Disconnect</button>
            </div>
            <UserNav setActiveTab={setActiveTab}/>
            <div className="user-page-content">
                {activeTab === "profil" &&
                    <UserInfo pseudo={getToken().pseudo} email={getToken().email}/>
                }
            </div>
        </div>
    );
};

export default User;
