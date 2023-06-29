import React from "react";
//icons
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Stars = (props) => {
    return (
        <div className="stars-container">
            <div className="stars">
                <StarBorderIcon/>
                <StarBorderIcon/>
                <StarBorderIcon/>
                <StarBorderIcon/>
                <StarBorderIcon/>
            </div>
            <span>{props.critic}</span>
        </div>
    );
};

export default Stars;
