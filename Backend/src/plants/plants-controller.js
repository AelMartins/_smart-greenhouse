const business = require('./plants-business')
const { responseError } = require('../../helper/errors-handler')


const findById = async (request, h) => {
    try {
        const result = await business.findById(request.params.id)
        return h.response({ message: 'Planta encontrada com sucesso!', result })

    } catch (error) {
        return responseError(h, error)
    }
}

const findAll = async (request, h) => {
    try {
        const result = await business.findAll(request.query)

        const message = result.length === 0 ? 'Nenhuma planta encontrada' : 'Plantas encontradas com sucesso!'
        return h.response({ totalCount: result.length, message, result })

    } catch (error) {
        return responseError(h, error)
    }
}

const create = async (request, h) => {
    try {
        const result = await business.create(request.payload)
        return h.response({ message: 'Planta cadastrada com sucesso!', result }).code(201)

    } catch (error) {
        return responseError(h, error)
    }
}

const update = async (request, h) => {
    try {
        const result = await business.update(request.payload)
        return h.response({ message: 'Planta atualizada com sucesso!', result })

    } catch (error) {
        return responseError(h, error)
    }
}

const destroy = async (request, h) => {
    try {
        const result = await business.destroy(request.params.id)
        return h.response({ message: 'Planta deletada com sucesso!', result })

    } catch (error) {
        return responseError(h, error)
    }
}

module.exports = {
    findById,
    findAll,
    create,
    update,
    destroy,
}