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
        user_id: Joi
            .objectId(),
    })
}

const create = {
    payload: Joi.object({
        name: Joi
            .string()
            .required(),
        user_id: Joi
            .objectId()
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
    create,
    update,
    destroy
}