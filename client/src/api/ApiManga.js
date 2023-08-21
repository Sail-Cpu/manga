import axios from "axios";

const BASE_LINK = "http://localhost:3001";

export const get = {
  fetchImages: async (search) => {
    const endpoint = `${BASE_LINK}/images?search=${search}`;
    return await (
      await axios.get(endpoint)
    ).data;
  },
  fetchAuthorById: async (id) => {
    const endpoint = `${BASE_LINK}/authors/${id}`;
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
  fetchCollections: async (type, page, search, pageSize) => {
    const endpoint = `${BASE_LINK}/collections?type=${type}&page_size=${pageSize}&page=${page}&search=${search}`;
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
  fetchCollectionsByCategory: async (category, page, pageSize) => {
    const endpoint = `${BASE_LINK}/collections?category=${category}&page=${page}&page_size=${pageSize}`;
    return await (
      await axios.get(endpoint)
    ).data;
  },
  fetchMangas: async (collection, page, search, pageSize) => {
    const endpoint = `${BASE_LINK}/mangas?collection=${collection}&page_size=${pageSize}&page=${page}&search=${search}`;
    return await (
      await axios.get(endpoint)
    ).data;
  },
  fetchMangasById: async (manga) => {
    const endpoint = `${BASE_LINK}/mangas/${manga}`;
    return await (
      await axios.get(endpoint)
    ).data;
  },
  fetchCategories: async () => {
    const endpoint = `${BASE_LINK}/categories/`;
    return await (
      await axios.get(endpoint)
    ).data;
  },
  fetchCategoryById: async (category) => {
    const endpoint = `${BASE_LINK}/categories/${category}`;
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
