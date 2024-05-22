const repository = require('./data-plants-repository')

const findAll = async (plant_id, query) => {
    const options = {
        where: { plant_id },
        orderBy: Object.defineProperty({}, query.order, { value: query.order_type })
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

const create = async () => {

}

module.exports = {
    findAll,
    findLastData,
    create
}