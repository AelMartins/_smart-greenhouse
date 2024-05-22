const prisma = require('../../prisma')


const findAll = async (options) => {
    try {
        const result = await prisma.data_plants.findMany({
            ...options,
            select: {
                id: true,
                plant_id: true,
                illumination: true,
                celsius: true,
                humidity: true,
                weight: true,
            }
        })

        return result

    } catch (err) {
        throw err
    }
}

const findLastData = async (options) => {
    try {
        const result = await prisma.data_plants.findFirst(options)
        if (!result) throw Object.assign(new Error('Nenhum dado encontrado'), { statusCode: 404 })

        return result 

    } catch (err) {
        throw err
    }
}

const create = async (payload) => {
    try {
        const result = await prisma.data_plants.create({ data: payload })
        return result

    } catch (err) {
        throw err
    }
}

module.exports = {
    findAll,
    findLastData,
    create
}