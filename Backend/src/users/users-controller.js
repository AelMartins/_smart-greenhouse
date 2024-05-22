const business = require('./users-business')
const { responseError } = require('../../helper/errors-handler')


const findById = async (request, h) => {
    try {
        const result = await business.findById(request.params.id)
        return h.response(result)

    } catch (error) {
        return responseError(h, error)
    }
}

const findAll = async (request, h) => {
    try {
        const result = await business.findAll(request.query)

        const message = result.length === 0 ? 'Nenhum usuário encontrado' : 'Usuários encontrados com sucesso!'
        return h.response({ totalCount: result.length, message, result })

    } catch (error) {
        return responseError(h, error)
    }
}

const login = async (request, h) => {
    try {
        const result = await business.login(request.payload)
        return h.response(result).code(200)

    } catch (error) {
        return responseError(h, error)
    }
}

const create = async (request, h) => {
    try {
        const result = await business.create(request.payload)
        return h.response({ message: 'Usuário cadastrado com sucesso!', result }).code(201)

    } catch (error) {
        return responseError(h, error)
    }
}

const update = async (request, h) => {
    try {
        const result = await business.update(request.payload)
        return h.response({ message: 'Usuário atualizado com sucesso!', result })

    } catch (error) {
        return responseError(h, error)
    }
}

const destroy = async (request, h) => {
    try {
        const result = await business.destroy(request.params.id)
        return h.response({ message: 'Usuário deletado com sucesso!', result })

    } catch (error) {
        return responseError(h, error)
    }
}

module.exports = {
    findById,
    findAll,
    login,
    create,
    update,
    destroy,
}