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
        const result = await prisma.users.findMany({
            ...options,
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                created_at: true,
                updated_at: true,
            }
        })
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

const update = async (id, payload) => {
    try {
        const result = await prisma.users.update({
            data: payload,
            where: { id },
            select: {
                name: true,
                email: true,
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
        const find = await prisma.users.findUnique({
            where: { id },
            select: {
                id: true,
                plants: true
            }
        })
        if (!find) return


        /**
         * Deleta todas as Plantas do Usuário
         */
        const plantsRepository = require('../plants/plants-repository')
        find.plants.forEach(async data => {
            await plantsRepository.destroy(data.id)
        });


        const result = await prisma.users.delete({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
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
    update,
    destroy,
}