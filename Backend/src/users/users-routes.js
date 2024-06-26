const schema = require('./users-schema')
const { findById, findAll, login, create, update, destroy } = require('./users-controller')

const plugin = {
    name: 'users-route',
    version: '1',
    register: (server) => {
        server.route([
            {
                method: 'GET',
                path: '/users/{id}',
                options: {
                    handler: findById,
                    validate: schema.findById
                }
            },
            {
                method: 'GET',
                path: '/users',
                options: {
                    handler: findAll,
                    validate: schema.findAll
                }
            },
            {
                method: 'POST',
                path: '/users/login',
                options: {
                    handler: login,
                    validate: schema.login
                }
            },
            {
                method: 'POST',
                path: '/users',
                options: {
                    handler: create,
                    validate: schema.create
                }
            },
            {
                method: 'PUT',
                path: '/users',
                options: {
                    handler: update,
                    validate: schema.update
                }
            },
            {
                method: 'DELETE',
                path: '/users/{id}',
                options: {
                    handler: destroy,
                    validate: schema.destroy
                }
            },
        ])
    }
}

module.exports = plugin