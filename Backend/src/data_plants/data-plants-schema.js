const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const findAll = {
    params: Joi.object({
        plant_id: Joi
            .objectId()
            .required(),
    }),
    query: Joi.object({
        order: Joi
            .string()
            .valid('created_at', 'illumination', 'celsius', 'humidity', 'weight')
            .default('created_at'),
        order_type: Joi
            .string()
            .valid('asc', 'desc')
            .default('desc')
    })
}

const findLastData = {
    params: Joi.object({
        plant_id: Joi
            .objectId()
            .required(),
    })
}

const create = {
    payload: Joi.object({
        plant_id: Joi
            .objectId()
            .required(),
        illumination: Joi
            .number()
            .integer()
            .required(),
        celsius: Joi
            .number()
            .integer()
            .required(),
        humidity: Joi
            .number()
            .integer()
            .required(),
        weight: Joi
            .number()
            .required(),
    })
}

module.exports = {
    findAll,
    findLastData,
    create
}