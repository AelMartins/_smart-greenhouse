const schema = require('./plants-schema')
const { findById, findAll, create, update, destroy } = require('./plants-controller')

const plugin = {
    name: 'plants-route',
    version: '1',
    register: (server) => {
        server.route([
            {
                method: 'GET',
                path: '/plants/{id}',
                options: {
                    handler: findById,
                    validate: schema.findById
                }
            },
            {
                method: 'GET',
                path: '/plants',
                options: {
                    handler: findAll,
                    validate: schema.findAll
                }
            },
            {
                method: 'POST',
                path: '/plants',
                options: {
                    handler: create,
                    validate: schema.create
                }
            },
            {
                method: 'PUT',
                path: '/plants',
                options: {
                    handler: update,
                    validate: schema.update
                }
            },
            {
                method: 'DELETE',
                path: '/plants/{id}',
                options: {
                    handler: destroy,
                    validate: schema.destroy
                }
            },

        ])
    }
}

module.exports = plugin