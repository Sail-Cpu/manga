import React from "react";
//Components
import UserNav from "../../components/navigation/UserNav";

const User = () => {
  return (
    <div className="user-page">
      <div className="user-page-top">
        <button>Disconnect</button>
      </div>
      <UserNav />
    </div>
  );
};

export default User;
