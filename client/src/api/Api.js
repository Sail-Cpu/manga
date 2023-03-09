import axios from "axios";

const BASE_LINK = 'http://localhost:3001'

export const get = {
    fetchImages: async (search) => {
        const endpoint = `${BASE_LINK}/images?search=${search}`
        return await (await axios.get(endpoint)).data;
    }
}

export const post = {
    postImage: async (name, link, type) => {
        return axios.post(`${BASE_LINK}/images`, {
            name: name,
            link: link,
            type: type
        });
    },
    postAuthor: async (name, biography) => {
        return axios.post(`${BASE_LINK}/authors`, {
            name: name,
            biography: biography
        })
    }
}

export const patch = {
    patchImage: async (id, name, link, type) => {
        return axios.patch(`${BASE_LINK}/images/${id}`, {
            name: name,
            link: link,
            type: type
        });
    }
}

export const deleteRow = {
    deleteImage: async (id) => {
        const endpoint = `${BASE_LINK}/images/${id}`
        return await (await axios.delete(endpoint)).data;
    }
}