import axios from "axios";

const BASE_LINK = 'http://localhost:3001'

export const get = {
    fetchImages: async () => {
        const endpoint = `${BASE_LINK}/images`
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
    }
}