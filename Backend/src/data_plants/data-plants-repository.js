const prisma = require('../../prisma')


const findAll = async (options) => {
    try {
        const result = await prisma.data_plants.findMany(options)

        return result

    } catch (err) {
        throw err
    }
}

const findLastData = async (options) => {
    try {
        const result = await prisma.plants.findFirst(options)
        return result

    } catch (err) {
        throw err
    }
}

const create = async (payload) => {
    try {
        const result = await prisma.plants.create({ data: payload })
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