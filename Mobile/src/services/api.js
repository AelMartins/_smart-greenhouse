import axios from "axios"

const config = {
    baseURL: 'http:localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    }
}

const get = async (path = '') => {
    console.log(`Config Request GET: `, { ...config, method: 'get', path })
    // return await axios({ ...config, method: 'get', path })

    let data
    const value = path.split('?')[1].split('=')[1]
    console.log(value)
    if (value === "weight") {
        data = [100, 750, 450, 150, 325, 200, 250, 650, 840, 300, 523, 400]

    } else if (value === "lighting") {
        data = [437, 123, 150, 325, 650, 840, 300, 523, 400]

    } else if (value === "humidity") {
        data = [86, 12, 150, 53, 20, 523, 400]

    } else if (value === "temperature") {
        data = [76, 750, 250, 650, 840, 300, 523, 400]

    }

    return {
        data,
        label: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom']
    }
}

const post = async (path, data) => {
    console.log(`Config Request GET: ${{ ...config, method: 'post', path, data }}`)
    // return await axios({ ...config, method: 'post', path, data })
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