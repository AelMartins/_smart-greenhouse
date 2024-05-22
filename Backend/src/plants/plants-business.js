const repository = require('./plants-repository')

const findById = async (id) => {
    const user = await repository.findById(id)
    if (!user) throw Object.assign(new Error('Planta não encontrada'), { statusCode: 404 })

    return user
}

const findAll = async (query) => {
    return await repository.findAll({ where: query })
}

const create = async (payload) => {
    const findPlant = await repository.findAll({ where: payload })
    if (findPlant.length > 0) throw Object.assign(new Error('Planta já cadastrada!'), { statusCode: 409 })

    return await repository.create(payload)
}

const update = async (payload) => {
    return await repository.update(payload.id, { ...payload, id: undefined })
}

const destroy = async (id) => {
    return await repository.destroy(id)
}

module.exports = {
    findById,
    findAll,
    create,
    update,
    destroy,
}