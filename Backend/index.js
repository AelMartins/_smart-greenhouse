const { server, plugins } = require("./server");

(async () => {
    await server.register(plugins)

    await server.start()
    console.log("Server listening: " + server.info.uri);

    generateDataToPlants()
})()

function generateDataToPlants() {
    const cron = require('node-cron')
    const plants = require('./src/plants/plants-repository')
    const dataPlants = require('./src/data_plants/data-plants-repository')

    cron.schedule('* * * * *', async () => {
        const allPlants = await plants.findAll({ select: { id: true, name: true, data_plants: true } })

        const genRandom = () => {
            return Math.floor(Math.random() * 101);
        }

        allPlants.forEach(async plant => {
            if (plant.data_plants.length < 25) {
                const object = {
                    plant_id: plant.id,
                    illumination: genRandom(),
                    celsius: genRandom(),
                    humidity: genRandom(),
                    weight: genRandom() * 10
                }
                await dataPlants.create(object)
            }
        })
    })
}