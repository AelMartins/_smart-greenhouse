const { server, plugins } = require("./server");

(async () => {
    await server.register(plugins)

    await server.start()
    console.log("Server listening: " + server.info.uri);

    // server.logger.info(`Server listening: ${server.info.uri}`)
})()