import React from "react";
import { Link } from "react-router-dom";

const Next = (props) => {
  const allLink = () => {
    let links = [];
    links[0] = 1;
    if (props.page > 6) {
      if (props.allMangaPage > 3 && props.allMangaPage > props.page - 3) {
        links[1] = props.page - 5;
        links[2] = props.page - 4;
        links[3] = props.page - 3;
        links[4] = props.page - 2;
        links[5] = props.page - 1;
      } else if (props.allMangaPage > 3) {
        links[1] = props.allMangaPage - 2;
        links[2] = props.allMangaPage - 1;
        links[3] = props.allMangaPage;
        links[4] = props.allMangaPage + 1;
        links[5] = props.allMangaPage + 2;
      } else {
        links[1] = 2;
        links[2] = 3;
        links[3] = 4;
        links[4] = 5;
        links[5] = 6;
      }
      links[6] = props.page;
    } else {
      for (let i = 1; i < props.page; i++) {
        links[i] = i + 1;
      }
    }
    return links;
  };

  return (
    <div className="next-container">
      {props.page > 1 &&
        allLink().map((link, idx) => {
          return (
            <Link key={idx} to={`${props.path}/${link}`}>
              <button
                className="next-button"
                style={{
                  backgroundColor: props.allMangaPage == link ? "#798B91" : "",
                }}
              >
                {link}
              </button>
            </Link>
          );
        })}
    </div>
  );
};

export default Next;
