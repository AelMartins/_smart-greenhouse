const repository = require('./users-repository')

const findById = async (id) => {
    const user = await repository.findById(id)
    if (!user) throw Object.assign(new Error('Usuário não encontrado'), { statusCode: 404 })

    return user
}

const findAll = async (query) => {
    return await repository.findAll({ where: query })
}

const login = async (payload) => {
    const findUserLogin = await repository.findOne(payload)
    if (!findUserLogin) throw Object.assign(new Error('Não autorizado'), { statusCode: 401 })

    return findUserLogin
}

const create = async (payload) => {
    // Validação de e-mail único
    const verifyEmail = await repository.findOne({ email: payload.email })
    if (verifyEmail) throw Object.assign(new Error('E-mail já cadastrado'), { statusCode: 409 })

    return await repository.create(payload)
}

module.exports = {
    findById,
    findAll,
    login,
    create,
}