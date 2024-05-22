const schema = require('./data-plants-schema')
const { findAllByPlant, findAll, findLastData, create, destroy } = require('./data-plants-controller')

const plugin = {
    name: 'data-plants-route',
    version: '1',
    register: (server) => {
        server.route([
            {
                method: 'GET',
                path: '/data-plants/{plant_id}',
                options: {
                    handler: findAllByPlant,
                    validate: schema.findAllByPlant
                }
            },
            {
                method: 'GET',
                path: '/data-plants',
                options: {
                    handler: findAll,
                    validate: schema.findAll
                }
            },
            {
                method: 'GET',
                path: '/data-plants/last-data/{plant_id}',
                options: {
                    handler: findLastData,
                    validate: schema.findLastData
                }
            },
            {
                method: 'POST',
                path: '/data-plants',
                options: {
                    handler: create,
                    validate: schema.create
                }
            },
            {
                method: 'DELETE',
                path: '/data-plants/{id}',
                options: {
                    handler: destroy,
                    validate: schema.destroy
                }
            },
        ])
    }
}

module.exports = plugin