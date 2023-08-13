import React, { useEffect, useState } from "react";
//Api
import { get } from "../../api/ApiManga";
import * as url from "url";

const UserComment = (props) => {
  const [collection, setCollection] = useState();
  const [author, setAuthor] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    get
      .fetchCollection(props.collect_id)
      .then((response) => {
        setCollection(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.collect_id]);

  useEffect(() => {
    if (collection?.author_id) {
      get
        .fetchAuthorById(collection.author_id)
        .then((response) => {
          setAuthor(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [collection?.author_id]);

  useEffect(() => {
    if (collection?.type_id) {
      get
        .fetchTypeById(collection.type_id)
        .then((response) => {
          setType(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [collection?.type_id]);

  console.log(type);

  return (
    <div className="user-comment">
      {collection && author && type && (
        <>
          <div className="user-comment-top">
            <div
              className="user-comment-image"
              style={{ backgroundImage: `url(${props.poster})` }}
            ></div>
            <div className="user-comment-title-container">
              <div className="user-comment-title">
                <h1>{props.name}</h1>
                <h2>{type.name}</h2>
                <h2>{author.name}</h2>
              </div>
            </div>
          </div>
          <div className="user-comment-bottom">{props.commentary}</div>
        </>
      )}
    </div>
  );
};

export default UserComment;
