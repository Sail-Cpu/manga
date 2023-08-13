import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_LINK = "http://localhost:3002";

export const User = {
  fetchUserById: async (id) => {
    const endpoint = `${BASE_LINK}/users/${id}`;
    return await (
      await axios.get(endpoint)
    ).data;
  },
  fetchAllComments: async (product_id, type) => {
    const endpoint = `http://localhost:3002/commentary/${product_id}?type=${type}`;
    return await (
      await axios.get(endpoint)
    ).data;
  },
};

export const like = async (
  navigate,
  user_id,
  isLiked,
  likeConfig,
  dislikeConfig,
  setIsLiked
) => {
  if (!user_id) {
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

export const UserCommentary = async (
  user_id,
  config,
  setNewComments,
  newComments,
  title,
  commentary,
  setToggleCommentaryForm
) => {
  axios(config)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  setNewComments((newComments) => [
    ...newComments,
    { title: title, commentary: commentary, user_id: user_id },
  ]);
  setToggleCommentaryForm(false);
};
