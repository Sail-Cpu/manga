import React from "react";
//icons
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const Stars = (props) => {
  function rating(critic) {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (critic >= i + 1) {
        stars.push(0);
      } else if (critic < i + 1 && critic > i) {
        let l = parseInt(critic.toString().split(".")[1][0]);
        stars.push(100 - l * 10);
      } else {
        stars.push(100);
      }
    }
    return stars;
  }

  return (
    <div className="stars-container">
      <div className="stars">
        {rating(props.critic).map((rat, idx) => {
          return (
            <div className="star" key={idx}>
              <StarBorderIcon className="star-border" />
              <StarIcon
                className="star-no-border"
                style={{ clipPath: `inset(0 ${rat}% 0 0)` }}
              />
            </div>
          );
        })}
      </div>
      <span>{props.critic}</span>
    </div>
  );
};

export default Stars;
