import React from "react";

const MyCollectionManga = (props) => {
  return (
    <div className="my-collection-manga">
      <div
        className="my-collection-manga-image"
        style={{ backgroundImage: `url(${props.manga.poster})` }}
      ></div>
      <div className="my-collection-manga-title">
        <h1>{props.manga.name}</h1>
      </div>
    </div>
  );
};

export default MyCollectionManga;
