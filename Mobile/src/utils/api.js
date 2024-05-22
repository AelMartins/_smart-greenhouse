import axios from "axios"

const config = {
    baseURL: 'http:localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    }
}


const get = async (path = '', payload = {}) => {
    console.log(`Config Request GET: `, { ...config, method: 'get', path, payload })
    return await axios({ ...config, method: 'get', path })
}

const post = async (path, payload) => {
    console.log(`Config Request GET: `, { ...config, method: 'post', path, payload })
    return await axios({ ...config, method: 'post', path, data })
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