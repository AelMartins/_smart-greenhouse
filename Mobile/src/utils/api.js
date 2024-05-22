import axios from "axios"

const config = {
    baseURL: 'https://gf9ys3-4000.csb.app',
    headers: {
        'Content-Type': 'application/json'
    }
}


const get = async (path = '', payload = {}) => {
    return await axios.get(`${config.baseURL}${path}`, { headers: config.headers })
}

const post = async (path, data) => {
    return await axios.post(`${config.baseURL}${path}`, data, { headers: config.headers })
}

const put = async (config) => {
    return await axios.get(config)
}

const destroy = async (config) => {
    return await axios.get(config)
}

module.exports = {
    get,
    post,
    put,
    destroy,
}