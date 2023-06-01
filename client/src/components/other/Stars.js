import React from "react";
//icons
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Stars = () => {
  return (
    <div className="stars-container">
      <div className="stars">
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
      </div>
      <span>4.3</span>
    </div>
  );
};

export default Stars;
