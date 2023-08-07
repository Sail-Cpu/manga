import React, { useEffect, useRef, useState } from "react";

const UserNav = () => {
  const profilRef = useRef(null);
  const likesRef = useRef(null);
  const commentaryRef = useRef(null);
  const myCollectionRef = useRef(null);

  const [leftWidth, setLeftWidth] = useState({ left: 0, width: 0 });

  const [profilPosition, setProfilPosition] = useState({ left: 0, width: 0 });
  const [likesPosition, setLikesPosition] = useState({ left: 0, width: 0 });
  const [commentaryPosition, setCommentaryPosition] = useState({
    left: 0,
    width: 0,
  });
  const [myCollectionPosition, setMyCollectionPosition] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (
      profilRef.current &&
      likesRef.current &&
      commentaryRef.current &&
      myCollectionRef.current
    ) {
      setLeftWidth({
        left: profilRef.current.offsetLeft,
        width: profilRef.current.offsetWidth,
      });
      setProfilPosition({
        left: profilRef.current.offsetLeft,
        width: profilRef.current.offsetWidth,
      });
      setLikesPosition({
        left: likesRef.current.offsetLeft,
        width: likesRef.current.offsetWidth,
      });
      setCommentaryPosition({
        left: commentaryRef.current.offsetLeft,
        width: commentaryRef.current.offsetWidth,
      });
      setMyCollectionPosition({
        left: myCollectionRef.current.offsetLeft,
        width: myCollectionRef.current.offsetWidth,
      });
    }
  }, []);

  function chooseTab(left, width) {
    return {
      left: `${left}px`,
      width: `${width}px`,
    };
  }

  return (
    <div className="user-nav">
      <div className="user-nav-top">
        <div
          className="user-nav-tab"
          ref={profilRef}
          onClick={() =>
            setLeftWidth({
              left: profilPosition.left,
              width: profilPosition.width,
            })
          }
          style={{ marginRight: "12px" }}
        >
          <span>PROFIL</span>
        </div>
        <div
          className="user-nav-tab"
          ref={likesRef}
          onClick={() =>
            setLeftWidth({
              left: likesPosition.left,
              width: likesPosition.width,
            })
          }
          style={{ margin: "0 12px" }}
        >
          <span>LIKES</span>
        </div>
        <div
          className="user-nav-tab"
          ref={commentaryRef}
          onClick={() =>
            setLeftWidth({
              left: commentaryPosition.left,
              width: commentaryPosition.width,
            })
          }
          style={{ margin: "0 12px" }}
        >
          <span>COMMENTARY</span>
        </div>
        <div
          className="user-nav-tab"
          ref={myCollectionRef}
          onClick={() =>
            setLeftWidth({
              left: myCollectionPosition.left,
              width: myCollectionPosition.width,
            })
          }
          style={{ marginLeft: "12px" }}
        >
          <span>MY COLLECTION</span>
        </div>
      </div>
      <div className="user-nav-bottom">
        <div style={{ left: leftWidth.left, width: leftWidth.width }}></div>
      </div>
    </div>
  );
};

export default UserNav;
