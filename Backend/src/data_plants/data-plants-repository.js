const prisma = require('../../prisma')


const findById = async (id) => {
    try {
        const result = await prisma.data_plants.findUnique({ where: { id } })
        return result

    } catch (err) {
        throw err
    }
}

const findByField = async (options) => {
    try {
        const result = await prisma.data_plants.findMany(options)
        return result

    } catch (err) {
        throw err
    }
}

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
                created_at: true,
                updated_at: true,
            }
        })

        return result

    } catch (err) {
        throw err
    }
}

const findLastData = async (options) => {
    try {
        const result = {}
        const fields = ['illumination', 'celsius', 'humidity', 'weight']
        for (const field of fields) {
            let optByField = {
                ...options,
                select: {
                    id: true,
                    plant_id: true,
                    created_at: true,
                    updated_at: true,
                },
                take: 1,
            }
            Object.defineProperty(optByField.where, field, { value: { not: null }, enumerable: true, configurable: true })
            Object.defineProperty(optByField.select, field, { value: true, enumerable: true, configurable: true })

            await findByField(optByField).then(res => {
                Object.defineProperty(result, field, {
                    value: res.length > 0 ? { value: res[0][field], created_at: res[0].created_at, updated_at: res[0].updated_at } : null,
                    enumerable: true,
                    configurable: true
                })
            })

            delete optByField.where[field]
            delete optByField.select[field]
        }



        // const result = await prisma.data_plants.findFirst(options)
        // if (!result) throw Object.assign(new Error('Nenhum dado encontrado'), { statusCode: 404 })

        return result

    } catch (err) {
        throw err
    }
}

const findDataByField = async (options, field) => {
    try {
        const result = await prisma.data_plants.findMany(options)
            .then(async res => {
                return await Promise.all(res.map(item => item[field]).filter(item => !!item))
            })

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

const destroy = async (id) => {
    try {
        const find = await findById(id)
        if (!find) return

        const result = await prisma.data_plants.delete({ where: { id } })
        return result

    } catch (err) {
        throw err
    }
}

module.exports = {
    findAll,
    findLastData,
    findDataByField,
    create,
    destroy
}