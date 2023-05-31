import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../api/Api";

const Collection = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState();
  const [author, setAuthor] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    get
      .fetchCollection(collectionId)
      .then((response) => {
        setCollection(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [collectionId]);

  useEffect(() => {
    if (collection?.author_id) {
      get
        .fetchAuthor(collection.author_id)
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
    <div className="collection-container">
      {collection && author && type && (
        <div className="collection">
          <div className="collection-head">
            <div className="collection-head-block-container">
              <div
                className="collection-head-img"
                style={{
                  backgroundImage: `url(${collection.background_images[0]})`,
                }}
              ></div>
              <div className="collection-head-content">
                <div className="head-content-top">
                  <span style={{ color: "#A5ADAF" }}>{author.name}</span>
                  <span>{type.name}</span>
                </div>
                <div className="head-content-middle">
                  <h1>{collection.name}</h1>
                </div>
                <div className="head-content-bottom">
                  <span>{collection.year}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="collection-long-bar"></div>
        </div>
      )}
    </div>
  );
};

export default Collection;
