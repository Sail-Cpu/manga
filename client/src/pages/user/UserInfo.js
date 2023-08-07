import React from 'react';

const UserInfo = (props) => {

    return (
        <div className="user-info">
            <div className="user-info-left">
                <div className="user-info-picture">
                    {props.pseudo[0].toUpperCase()}
                </div>
            </div>
            <div className="user-info-right">
                <span>{props.pseudo}</span>
                <span>{props.email}</span>
                <span style={{color: '#fff', cursor: 'pointer'}}>Modif Info</span>
                <span style={{color: '#fff', cursor: 'pointer'}}>Get Api Key</span>
            </div>
        </div>
    )
}

export default UserInfo;