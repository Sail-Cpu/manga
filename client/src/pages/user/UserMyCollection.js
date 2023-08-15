import React, { useContext, useEffect, useState } from "react";
//Context
import { UserContext } from "../../context/UserContext";
//Components
import MyCollectionProduct from "../../components/product/MyCollectionProduct";
//Api
import { User } from "../../api/ApiUser";
import { get } from "../../api/ApiManga";

const UserMyCollection = () => {
  const { getToken } = useContext(UserContext);
  const [allCollection, setAllCollection] = useState([]);
  const [collectionManga, setCollectionManga] = useState([]);

  useEffect(() => {
    User.fetchUserById(getToken()?.id)
      .then((userResponse) => {
        const myCollection = userResponse.myCollection;
        const fetchPromises = [];

        for (let i = 0; i < myCollection.length; i++) {
          const fetchPromise = get
            .fetchMangasById(myCollection[i])
            .then((mangaResponse) => {
              return mangaResponse.data[0];
            })
            .catch((error) => {
              console.log(error);
              return null;
            });
          fetchPromises.push(fetchPromise);
        }
        Promise.all(fetchPromises).then((allResponses) => {
          setAllCollection(
            allResponses.filter((response) => response !== null)
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const updatedCollectionManga = [...collectionManga];

    allCollection.forEach((manga) => {
      const contientElement = updatedCollectionManga.find(
        (item) => item.collect_id === manga.collection_id
      );
      if (!contientElement) {
        updatedCollectionManga.push({
          collect_id: manga.collection_id,
          mangas: [manga],
        });
      } else {
        const index = updatedCollectionManga.findIndex(
          (item) => item.collect_id === manga.collection_id
        );
        updatedCollectionManga[index].mangas.push(manga);
      }
    });

    setCollectionManga(updatedCollectionManga);
  }, [allCollection]);

  return (
    <div className="user-my-collection">
      {collectionManga.map((collection, idx) => {
        return <MyCollectionProduct key={idx} collectionManga={collection} />;
      })}
    </div>
  );
};

export default UserMyCollection;
