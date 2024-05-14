import axios from "axios"

const config = {
    baseURL: 'http:localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    }
}

const simulationData = {
    users: [
        {
            id: '1',
            name: 'Usuário Padrão',
            email: '',
            password: ''
        }
    ],
    plants: [
        {
            id: '1',
            users_id: '1',
            name: 'Plantinha Show'
        }
    ],
    data: [
        {
            id: '1',
            plants_id: '1',
            illumination: 100,
            celsius: 18,
            humidity: 80,
            weight: 0.254,
            date: new Date().getDate(),
            time: new Date().getTime(),
        },
        {
            id: '2',
            plants_id: '1',
            illumination: 45,
            celsius: 22,
            humidity: 85,
            weight: 0.255,
            date: new Date().getDate(),
            time: new Date().getTime(),
        },
        {
            id: '3',
            plants_id: '1',
            illumination: 100,
            celsius: 32,
            humidity: 48,
            weight: 0.245,
            date: new Date().getDate(),
            time: new Date().getTime(),
        },
        {
            id: '4',
            plants_id: '1',
            illumination: 5,
            celsius: 9,
            humidity: 68,
            weight: 0.220,
            date: new Date().getDate(),
            time: new Date().getTime(),
        },
        {
            id: '5',
            plants_id: '1',
            illumination: 64,
            celsius: 20,
            humidity: 63,
            weight: 0.124,
            date: new Date().getDate(),
            time: new Date().getTime(),
        },
        {
            id: '6',
            plants_id: '1',
            illumination: 89,
            celsius: 24,
            humidity: 77,
            weight: 0.654,
            date: new Date().getDate(),
            time: new Date().getTime(),
        },
        {
            id: '7',
            plants_id: '1',
            illumination: 12,
            celsius: 25,
            humidity: 25,
            weight: 0.342,
            date: new Date().getDate(),
            time: new Date().getTime(),
        },

        // Planta 2 para teste de usuário cadastrado
        {
            id: '8',
            plants_id: '2',
            illumination: 100,
            celsius: 18,
            humidity: 80,
            weight: 0.254,
            date: new Date().getDate(),
            time: new Date().getTime(),
        },
        {
            id: '9',
            plants_id: '2',
            illumination: 45,
            celsius: 22,
            humidity: 85,
            weight: 0.255,
            date: new Date().getDate(),
            time: new Date().getTime(),
        },
        {
            id: '10',
            plants_id: '2',
            illumination: 100,
            celsius: 32,
            humidity: 48,
            weight: 0.245,
            date: new Date().getDate(),
            time: new Date().getTime(),
        },
        {
            id: '11',
            plants_id: '2',
            illumination: 5,
            celsius: 9,
            humidity: 68,
            weight: 0.220,
            date: new Date().getDate(),
            time: new Date().getTime(),
        },
        {
            id: '12',
            plants_id: '2',
            illumination: 64,
            celsius: 20,
            humidity: 63,
            weight: 0.124,
            date: new Date().getDate(),
            time: new Date().getTime(),
        },
        {
            id: '13',
            plants_id: '2',
            illumination: 89,
            celsius: 24,
            humidity: 77,
            weight: 0.654,
            date: new Date().getDate(),
            time: new Date().getTime(),
        },
        {
            id: '14',
            plants_id: '2',
            illumination: 12,
            celsius: 25,
            humidity: 25,
            weight: 0.342,
            date: new Date().getDate(),
            time: new Date().getTime(),
        }
    ],
    labels: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom']
}

const get = async (path = '', payload = {}) => {
    // console.log(`Config Request GET: `, { ...config, method: 'get', path, payload })
    // return await axios({ ...config, method: 'get', path })


    if (path === '/plants') {
        const plant = simulationData.plants.find(plant => plant.users_id === payload.user_id) || simulationData.plants[0]
        let data = payload.reverse ? simulationData.data[0] : simulationData.data[6]

        return {
            ...plant,
            data
        }

    } else if (path == '/data') {
        const plant = simulationData.plants.find(plant => plant.users_id === payload.user_id)
        let data = []

        for (const item of simulationData.data.filter(item => item.plants_id === plant.id)) {
            data.push(item[payload.type])
        }

        return {
            data,
            labels: simulationData.labels
        }
    }
}

const post = async (path, payload) => {
// console.log(`Config Request GET: `, { ...config, method: 'post', path, payload })
    // return await axios({ ...config, method: 'post', path, data })


    if (path === '/login') {
        const findUser = simulationData.users.find(user => user.email === payload.email && user.password === payload.password)
        if (!findUser) throw new Error('E-mail e/ou Senha inválidos!')

        const Plants = simulationData.plants.filter(plant => {
            if (plant.users_id === findUser.id) {
                return {
                    ...plant,
                    data: simulationData.data.filter(d => d.plants_id === plant.id)
                }
            }
        })
        return { ...findUser, Plants }

    } else if (path === '/users') {
        const verify = simulationData.users.find(user => user.email === payload.email)
        if (verify) throw Object.assign(new Error('E-mail já cadastrado!'), { email: false })

        simulationData.users.push({
            id: '2',
            ...payload
        })
        return { success: true, message: 'Usuário cadastrado com sucesso!' }
    }
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