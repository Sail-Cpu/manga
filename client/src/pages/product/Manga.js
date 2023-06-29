import React, {useEffect, useState} from "react";
import {get} from "../../api/Api";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Stars from "../../components/other/Stars";
import {useParams} from "react-router-dom";

const Manga = () => {
    const {mangaId} = useParams();
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

    console.log(type);

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
                            <img alt="poster" src={manga.poster}/>
                        </div>
                        <div className="manga-head-right">
                            <h3>{author.name}</h3>
                            <h2>{collection.name}</h2>
                            <h1>{manga.name}</h1>
                            <h3>{type.name}</h3>
                            <div className="manga-like">
                                <FavoriteBorderIcon className="heart"/>
                                <Stars/>
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
                </div>
            )}
        </div>
    );
};

export default Manga;
