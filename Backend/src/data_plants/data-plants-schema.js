const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const findAllByPlant = {
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

const findAll = {
    query: Joi.object({
        plant_id: Joi
            .objectId(),
        illumination: Joi
            .number()
            .integer(),
        celsius: Joi
            .number()
            .integer(),
        humidity: Joi
            .number()
            .integer(),
        weight: Joi
            .number(),
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

const findDataByField = {
    query: Joi.object({
        plant_id: Joi
            .objectId()
            .required(),
        data_field: Joi
            .string()
            .valid('illumination', 'celsius', 'humidity', 'weight')
            .default('illumination'),
    })
}

const create = {
    payload: Joi.object({
        plant_id: Joi
            .objectId()
            .required(),
        illumination: Joi
            .number()
            .integer(),
        celsius: Joi
            .number()
            .integer(),
        humidity: Joi
            .number()
            .integer(),
        weight: Joi
            .number(),
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
    findAllByPlant,
    findAll,
    findLastData,
    findDataByField,
    create,
    destroy
}