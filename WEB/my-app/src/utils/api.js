const axios = require('axios');

const config = {
    baseURL: 'https://p29ply-4000.csb.app',
    headers: {
        'Content-Type': 'application/json'
    }
}


const get = async (path) => {
    return await axios.get(`${config.baseURL}${path}`, { headers: config.headers }).then(res => res.data)
}

const post = async (path, data) => {
    return await axios.post(`${config.baseURL}${path}`, data, { headers: config.headers }).then(res => res.data)
}

const put = async (path, data) => {
    return await axios.put(`${config.baseURL}${path}`, data, { headers: config.headers }).then(res => res.data)
}

const destroy = async (path) => {
    return await axios.delete(`${config.baseURL}${path}`).then(res => res.data)
}

module.exports = { get, post, put, destroy }