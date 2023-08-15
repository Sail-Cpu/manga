import React, { useEffect, useState } from "react";
//Api
import { get } from "../../api/ApiManga";
//Components
import MyCollectionManga from "./MyCollectionManga";

const MyCollectionProduct = (props) => {
  const [collection, setCollection] = useState({});
  const [type, setType] = useState("");
  const [collectManga, setCollectManga] = useState({
    myMangas: [],
    allManga: [],
  });
  const [collectMangaPercentage, setCollectMangaPercentage] = useState(0);
  const [toggleMangas, setToggleMangas] = useState(false);

  useEffect(() => {
    if (props.collectionManga?.collect_id) {
      get
        .fetchCollection(props.collectionManga.collect_id)
        .then((response) => {
          setCollection(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.collectionManga?.collect_id]);

  useEffect(() => {
    if (props.collectionManga?.collect_id) {
      get
        .fetchMangas(props.collectionManga?.collect_id)
        .then((response) => {
          setCollectManga((prevState) => ({
            myMangas: [...prevState.myMangas, props.collectionManga?.mangas],
            allManga: [...prevState.allManga, response.data],
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.collectionManga?.collect_id]);

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

  useEffect(() => {
    if (collectManga?.myMangas[0]) {
      setCollectMangaPercentage(
        (collectManga?.myMangas[0].length * 100) /
          collectManga?.allManga[0].length
      );
    }
  }, [collectManga?.myMangas[0]]);

  return (
    <div className="user-my-collection-product-container">
      {collection && type && (
        <div className="user-my-collection-product-block">
          <div className="user-my-collection-product">
            <div
              className="my-collection-product-image"
              style={{
                backgroundImage: `url(${collection.background_images?.[0]})`,
              }}
            ></div>
            <div className="my-collection-product-info">
              <div className="my-collection-product-title">
                <h1>{collection.name}</h1>
              </div>
              <div className="my-collection-product-bonus">
                <span>{type.name}</span>
                <span>
                  {collectManga?.myMangas[0].length} /{" "}
                  {collectManga?.allManga[0].length}
                </span>
              </div>
            </div>
            <div className="my-collection-product-bottom">
              <button>All Collection</button>
              <button onClick={() => setToggleMangas(!toggleMangas)}>
                My Collection
              </button>
            </div>
          </div>
          <div className="user-my-collection-product-percentage-container">
            <div className="user-my-collection-product-percentage">
              <div
                className="user-my-collection-product-percentage-content"
                style={{ width: `${collectMangaPercentage}%` }}
              ></div>
            </div>
            <h1>100%</h1>
          </div>
        </div>
      )}
      <div className="user-my-collection-product-mangas-list">
        {collectManga.myMangas?.[0] &&
          toggleMangas &&
          collectManga.myMangas?.[0].map((manga, idx) => {
            return <MyCollectionManga key={idx} manga={manga} />;
          })}
      </div>
    </div>
  );
};

export default MyCollectionProduct;
