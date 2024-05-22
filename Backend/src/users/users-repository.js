const prisma = require('../../prisma')


const findById = async (id) => {
    try {
        const result = await prisma.users.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                created_at: true,
                updated_at: true,
                plants: true
            }
        })

        return result

    } catch (err) {
        throw err
    }
}

const findAll = async (options) => {
    try {
        const result = await prisma.users.findMany(options)
        return result

    } catch (err) {
        throw err
    }
}

const findOne = async (options) => {
    try {
        const result = await prisma.users.findUnique({
            where: { ...options },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                created_at: true,
                updated_at: true
            }
        })

        return result

    } catch (err) {
        throw err
    }
}

const create = async (payload) => {
    try {
        const result = await prisma.users.create({
            data: payload,
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                created_at: true,
                updated_at: true
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
    findOne,
    create,
}