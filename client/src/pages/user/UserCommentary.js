import React, { useContext, useEffect, useRef, useState } from "react";
//Api
import { get } from "../../api/ApiManga";
import { User } from "../../api/ApiUser";
//Context
import { UserContext } from "../../context/UserContext";
//Components
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
    if (userCommentaryRef.current && commentaryColumn.number !== 1) {
      setCommentaryColumn({
        width: userCommentaryRef.current.offsetWidth,
        number: parseInt(userCommentaryRef.current.offsetWidth / minSize),
      });
    }
  }, [userCommentaryRef.current]);

  const handleResize = () => {
    if (commentaryColumn.number !== 1) {
      setCommentaryColumn({
        width: userCommentaryRef.current.offsetWidth,
        number: parseInt(userCommentaryRef.current.offsetWidth / minSize),
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [allComment, setAllComment] = useState([]);

  useEffect(() => {
    User.fetchUserById(getToken()?.id)
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

  const columns = Array.from({
    length: commentaryColumn.number !== 0 ? commentaryColumn.number : 1,
  });

  return (
    <div
      ref={userCommentaryRef}
      className="user-commentary-container"
      style={{
        gridTemplateColumns: `repeat(${columns.length}, minmax(250px, ${minSize}px)`,
      }}
    >
      {columns.map((_, idx) => (
        <div key={idx} className="user-commentary-column">
          {allComment
            .filter((_, i) => i % columns.length === idx)
            .map((comment, i) => (
              <UserComment
                collect_id={comment.data.collection_id}
                poster={comment.data.poster}
                name={comment.data.name}
                title={comment.comment.title}
                commentary={comment.comment.commentary}
                comment_id={comment.comment.comment_id}
                key={i}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default UserCommentary;
