import React, { useState } from "react";
import { Link } from "react-router-dom";
//Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Tabs = (props) => {
  const [submenu, setSubmenu] = useState(false);

  return (
    <div className="tabs">
      <div className="tabs-header">
        <h1>{props.name}</h1>
        {props.submenu.length > 0 && (
          <ExpandMoreIcon
            className="more-icon"
            onClick={() => setSubmenu(!submenu)}
          />
        )}
      </div>
      <ul className="submenu" style={{ display: submenu ? "block" : "none" }}>
        {props.submenu.map((sub, index) => {
          return (
            <Link key={index} to={sub.path}>
              <li className="sub-tabs">{sub.name}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Tabs;
