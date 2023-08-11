import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//Context
import { UserContext } from "../../context/UserContext";
//Api
import { get } from "../../api/Api";
//Icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Stars from "../../components/other/Stars";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import Commentary from "../../components/other/Commentary";

const Manga = () => {
  const { mangaId } = useParams();
  const { getToken } = useContext(UserContext);
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false);

  const fetchUserById = async () => {
    const endpoint = `http://localhost:3002/users/${getToken()?.id}`;
    return await (
      await axios.get(endpoint)
    ).data;
  };

  useEffect(() => {
    if (getToken()) {
      fetchUserById()
        .then((response) => {
          if (response.mangasLikes.includes(parseInt(mangaId))) {
            setIsLiked(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [mangaId]);

  const [manga, setManga] = useState();
  const [collection, setCollection] = useState();
  const [author, setAuthor] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    get
      .fetchMangasById(mangaId)
      .then((response) => {
        setManga(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [mangaId]);

  useEffect(() => {
    if (manga?.collection_id) {
      get
        .fetchCollection(manga.collection_id)
        .then((response) => {
          setCollection(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [manga?.collection_id]);

  useEffect(() => {
    if (collection?.author_id) {
      get
        .fetchAuthorById(collection?.author_id)
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
        .fetchTypeById(collection?.type_id)
        .then((response) => {
          setType(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [collection?.type_id]);

  const likeConfig = {
    method: "post",
    url: "http://localhost:3002/like",
    data: {
      type: "mangas",
      user_id: getToken()?.id,
      product_id: mangaId,
    },
  };

  const dislikeConfig = {
    method: "delete",
    url: "http://localhost:3002/like",
    data: {
      type: "mangas",
      user_id: getToken()?.id,
      product_id: mangaId,
    },
  };

  const like = async (e) => {
    if (!getToken()) {
      navigate("/sign/signin");
      return;
    }
    if (!isLiked) {
      axios(likeConfig)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios(dislikeConfig)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="manga-container">
      {manga && collection && author && type && (
        <div className="manga-content">
          <div className="manga-head">
            <div
              className="manga-head-left"
              style={{
                backgroundImage: `url('${collection.background_images[0]}')`,
              }}
            >
              <img alt="poster" src={manga.poster} />
            </div>
            <div className="manga-head-right">
              <h3>{author.name}</h3>
              <h2>{collection.name}</h2>
              <h1>{manga.name}</h1>
              <h3>{type.name}</h3>
              <div className="manga-like">
                {!getToken() || !isLiked ? (
                  <FavoriteBorderIcon
                    className="heart"
                    onClick={(e) => like(e)}
                  />
                ) : (
                  <FavoriteIcon className="heart" onClick={(e) => like(e)} />
                )}
                <Stars />
              </div>
            </div>
          </div>
          <div className="manga-synopsis">
            <h2>Synopsis</h2>
            {
              <div
                dangerouslySetInnerHTML={{
                  __html: manga.description,
                }}
              />
            }
          </div>
          <Commentary type="mangas" productId={mangaId} />
        </div>
      )}
    </div>
  );
};

export default Manga;
