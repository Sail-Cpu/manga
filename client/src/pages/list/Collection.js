import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../api/Api";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Stars from "../../components/other/Stars";
//import FavoriteIcon from '@mui/icons-material/Favorite';

const Collection = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState();
  const [author, setAuthor] = useState();
  const [type, setType] = useState();

  const [delimited, setDelimited] = useState(true);

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

  function TextDelimited(text) {
    if (delimited) {
      return text.substring(0, 1100) + "...";
    }
    if (!delimited) {
      return text;
    }
  }

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
          <div className="collection-info">
            <div className="collection-info-left">
              <div className="collection-info-like">
                <FavoriteBorderIcon className="heart" />
                <Stars />
              </div>
              <div className="collection-info-bonus">
                <div className="info-bonus">
                  <span>Action</span>
                </div>
                <div className="info-bonus">
                  <span>Aventure</span>
                </div>
                <div className="info-bonus">
                  <span>Amour</span>
                </div>
                <div className="info-bonus">
                  <span>Suspense</span>
                </div>
              </div>
              <div className="collection-info-bonus">
                <div
                  className="info-bonus"
                  style={{ backgroundColor: "#798b91" }}
                >
                  <span>30 tome</span>
                </div>
              </div>
            </div>
            <div className="collection-info-right">
              {
                <div
                  dangerouslySetInnerHTML={{
                    __html: TextDelimited(collection.description),
                  }}
                />
              }
              {delimited ? (
                <span onClick={() => setDelimited(false)}>more</span>
              ) : (
                <span onClick={() => setDelimited(true)}>less</span>
              )}
            </div>
          </div>
          <div className="collection-short-bar"></div>
        </div>
      )}
    </div>
  );
};

export default Collection;
