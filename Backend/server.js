const Hapi = require("@hapi/hapi");
const routes = require('./routes');

const server = Hapi.server({
  port: process.env.PORT || 4000,
  host: "0.0.0.0",
  routes: {
    cors: true
  }
})

const plugins = [
  {
    plugin: routes,
    options: {
      routesBaseDir: './src'
    }
  }
]

module.exports = { server, plugins }