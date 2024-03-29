import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
//Components
import UserNav from "../../components/navigation/UserNav";
import UserInfo from "./UserInfo";
import UserLikes from "./UserLikes";
import UserCommentary from "./UserCommentary";
import UserMyCollection from "./UserMyCollection";

const User = () => {
  const { getToken } = useContext(UserContext);

  const [activeTab, setActiveTab] = useState("profil");

  const disconect = () => {
    sessionStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className="user-page">
      <div className="user-page-top">
        <button onClick={() => disconect()}>Disconnect</button>
      </div>
      <UserNav setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="user-page-content">
        {activeTab === "profil" && (
          <UserInfo pseudo={getToken().pseudo} email={getToken().email} />
        )}
        {activeTab === "likes" && <UserLikes />}
        {activeTab === "commentary" && <UserCommentary />}
        {activeTab === "my collection" && <UserMyCollection />}
      </div>
    </div>
  );
};

export default User;
