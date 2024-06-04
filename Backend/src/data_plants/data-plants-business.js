const repository = require('./data-plants-repository')

const findAllByPlant = async (plant_id, query) => {
    const options = {
        where: { plant_id },
        orderBy: Object.defineProperty({}, query.order, { value: query.order_type })
    }

    return await repository.findAll(options)
}

const findAll = async (query) => {
    // Define ordenação
    const { order, order_type } = query
    delete query.order
    delete query.order_type

    // Opções de Busca
    const options = {
        where: query,
        orderBy: Object.defineProperty({}, order, { value: order_type })
    }

    return await repository.findAll(options)
}

const findLastData = async (plant_id) => {
    const options = {
        where: { plant_id },
        orderBy: { created_at: 'desc' }
    }
    return await repository.findLastData(options)
}

const findDataByField = async (query) => {
    const { plant_id, data_field } = query
    const options = {
        where: { plant_id },
        orderBy: { created_at: 'desc' }
    }
    Object.defineProperty(options.where, data_field, { value: { not: null } })

    return await repository.findDataByField(options, data_field)
}

const create = async (payload) => {
    return await repository.create(payload)
}

const destroy = async (id) => {
    return await repository.destroy(id)
}

module.exports = {
    findAllByPlant,
    findAll,
    findLastData,
    findDataByField,
    create,
    destroy
}