const schema = require('./data-plants-schema')
const { findAll, findLastData, create } = require('./data-plants-controller')

const plugin = {
    name: 'data-plants-route',
    version: '1',
    register: (server) => {
        server.route([
            {
                method: 'GET',
                path: '/data-plants/{plant_id}',
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
            }
        ])
    }
}

module.exports = plugin