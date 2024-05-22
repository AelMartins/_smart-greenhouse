const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);


const findById = {
    params: Joi.object({
        id: Joi
            .objectId()
            .required()
    })
}

const findAll = {
    query: Joi.object({
        id: Joi
            .objectId(),
        name: Joi
            .string(),
        email: Joi
            .string(),
    })
}

const login = {
    payload: Joi.object({
        email: Joi
            .string()
            .required(),
        password: Joi
            .string()
            .required(),
    })
}

const create = {
    payload: Joi.object({
        name: Joi
            .string()
            .required(),
        email: Joi
            .string()
            .required(),
        password: Joi
            .string()
            .required(),
    })
}

const update = {
    payload: Joi.object({
        id: Joi
            .objectId()
            .required(),
        name: Joi
            .string(),
        email: Joi
            .string(),
        password: Joi
            .string(),
    })
}

const destroy = {
    params: Joi.object({
        id: Joi
            .objectId()
            .required()
    })
}

module.exports = {
    findById,
    findAll,
    login,
    create,
    update,
    destroy,
}