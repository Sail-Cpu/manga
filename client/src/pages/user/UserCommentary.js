import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { get } from "../../api/Api";
import { UserContext } from "../../context/UserContext";
import UserComment from "../../components/other/UserComment";

const UserCommentary = () => {
  const { getToken } = useContext(UserContext);
  const userCommentaryRef = useRef();
  const [commentaryColumn, setCommentaryColumn] = useState({
    width: 0,
    number: 0,
  });
  const minSize = 450;

  useEffect(() => {
    if (userCommentaryRef.current) {
      setCommentaryColumn({
        width: userCommentaryRef.current.offsetWidth,
        number: parseInt(userCommentaryRef.current.offsetWidth / minSize),
      });
    }
  }, [userCommentaryRef.current]);

  const handleResize = () => {
    setCommentaryColumn({
      width: userCommentaryRef.current.offsetWidth,
      number: parseInt(userCommentaryRef.current.offsetWidth / minSize),
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [allComment, setAllComment] = useState([]);

  const fetchUserById = async () => {
    const endpoint = `http://localhost:3002/users/${getToken()?.id}`;
    return await (
      await axios.get(endpoint)
    ).data;
  };

  useEffect(() => {
    fetchUserById()
      .then((response) => {
        let mangaComment = response.mangaComment;
        for (let i = 0; i < mangaComment.length; i++) {
          get
            .fetchMangasById(mangaComment[i].manga_Id)
            .then((response) => {
              setAllComment((comment) => [
                ...comment,
                { data: response.data[0], comment: mangaComment[i] },
              ]);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = Array.from({ length: commentaryColumn.number });

  return (
    <div
      ref={userCommentaryRef}
      className="user-commentary-container"
      style={{
        gridTemplateColumns: `repeat(${commentaryColumn.number}, ${minSize}px)`,
      }}
    >
      {columns.map((_, idx) => (
        <div key={idx} className="user-commentary-column">
          {allComment
            .filter((_, i) => i % commentaryColumn.number === idx)
            .map((comment, i) => (
              <UserComment
                collect_id={comment.data.collection_id}
                poster={comment.data.poster}
                name={comment.data.name}
                title={comment.comment.title}
                commentary={comment.comment.commentary}
                key={i}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default UserCommentary;
