const business = require('./data-plants-business')
const { responseError } = require('../../helper/errors-handler')


const findAllByPlant = async (request, h) => {
    try {
        const result = await business.findAllByPlant(request.params.plant_id, request.query)

        const message = result.length === 0 ? 'Nenhum dado encontrado' : 'Dados encontrados com sucesso!'
        return h.response({ totalCount: result.length, message, result })

    } catch (error) {
        return responseError(h, error)
    }
}

const findAll = async (request, h) => {
    try {
        const result = await business.findAll(request.query)

        const message = result.length === 0 ? 'Nenhum dado encontrado' : 'Dados encontrados com sucesso!'
        return h.response({ totalCount: result.length, message, result })

    } catch (error) {
        return responseError(h, error)
    }
}

const findLastData = async (request, h) => {
    try {
        const result = await business.findLastData(request.params.plant_id)
        return h.response({ message: 'Últimos dados encontrado', result })

    } catch (error) {
        return responseError(h, error)
    }
}

const findTypeDataToChart = async (request, h) => {
    try {
        const result = await business.findTypeDataToChart(request.params.type_data, request.query.plant_id)
        const message = result.length === 0 ? 'Nenhum dado encontrado' : 'Dados encontrados com sucesso!'
        return h.response({ totalCount: result.length, message, result })

    } catch (error) {
        return responseError(h, error)
    }
}

const create = async (request, h) => {
    try {
        const result = await business.create(request.payload)
        return h.response({ message: 'Dados cadastrados com sucesso!', result }).code(201)

    } catch (error) {
        return responseError(h, error)
    }
}

const destroy = async (request, h) => {
    try {
        const result = await business.destroy(request.params.id)
        return h.response({ message: 'Dados deletados com sucesso!', result })

    } catch (error) {
        return responseError(h, error)
    }
}

module.exports = {
    findAllByPlant,
    findAll,
    findLastData,
    findTypeDataToChart,
    create,
    destroy,
}