const prisma = require('../../prisma')


const findById = async (id) => {
    try {
        const result = await prisma.plants.findUnique({ where: { id } })
        return result

    } catch (err) {
        throw err
    }
}

const findAll = async (options) => {
    try {
        const result = await prisma.plants.findMany(options)
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

const update = async (id, payload) => {
    try {
        const result = await prisma.plants.update({
            data: payload,
            where: { id },
            select: {
                id: true,
                name: true,
                user_id: true,
                created_at: true,
                updated_at: true
            }
        })
        return result

    } catch (err) {
        throw err
    }
}

const destroy = async (id) => {
    try {
        const find = await findById(id)
        if (!find) return

        const result = await prisma.plants.delete({
            where: { id },
            select: {
                id: true,
                name: true,
                user_id: true,
            }
        })
        return result

    } catch (err) {
        throw err
    }
}

module.exports = {
    findById,
    findAll,
    create,
    update,
    destroy,
}