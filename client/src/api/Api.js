import axios from "axios";

const BASE_LINK = "http://localhost:3001";

export const get = {
  fetchImages: async (search) => {
    const endpoint = `${BASE_LINK}/images?search=${search}`;
    return await (
      await axios.get(endpoint)
    ).data;
  },
  fetchAuthor: async (search) => {
    const endpoint = `${BASE_LINK}/authors?search=${search}`;
    return await (
      await axios.get(endpoint)
    ).data;
  },
  fetchType: async () => {
    const endpoint = `${BASE_LINK}/types`;
    return await (
      await axios.get(endpoint)
    ).data;
  },
  fetchTypeById: async (id) => {
    const endpoint = `${BASE_LINK}/types/${id}`;
    return await (
      await axios.get(endpoint)
    ).data;
  },
  fetchCollections: async (type) => {
    const endpoint = `${BASE_LINK}/collections?type=${type}`;
    return await (
      await axios.get(endpoint)
    ).data;
  },
  fetchCollection: async (collection) => {
    const endpoint = `${BASE_LINK}/collections/${collection}`;
    return await (
      await axios.get(endpoint)
    ).data;
  },
};

export const post = {
  postImage: async (name, link, type) => {
    return axios.post(`${BASE_LINK}/images`, {
      name: name,
      link: link,
      type: type,
    });
  },
  postAuthor: async (name, biography) => {
    return axios.post(`${BASE_LINK}/authors`, {
      name: name,
      biography: biography,
    });
  },
};

export const patch = {
  patchImage: async (id, name, link, type) => {
    return axios.patch(`${BASE_LINK}/images/${id}`, {
      name: name,
      link: link,
      type: type,
    });
  },
  patchAuthor: async (id, name, biography) => {
    return axios.patch(`${BASE_LINK}/authors/${id}`, {
      name: name,
      biography: biography,
    });
  },
};

export const deleteRow = {
  deleteImage: async (id) => {
    const endpoint = `${BASE_LINK}/images/${id}`;
    return await (
      await axios.delete(endpoint)
    ).data;
  },
  deleteAuthor: async (id) => {
    const endpoint = `${BASE_LINK}/authors/${id}`;
    return await (
      await axios.delete(endpoint)
    ).data;
  },
};
