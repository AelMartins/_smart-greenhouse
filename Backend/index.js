const { server, plugins } = require("./server");

(async () => {
    await server.register(plugins)

    await server.start()
    console.log("Server listening: " + server.info.uri);

    generateDataToPlants()
})()

function generateDataToPlants() {
    const cron = require('node-cron')
    const Simulator = require('./helper/DataSimulator')
    const { findAll: findAllPlants } = require('./src/plants/plants-repository')
    const { findLastData } = require('./src/data_plants/data-plants-repository')

    cron.schedule('* * * * *', async () => {
        const allPlants = await findAllPlants({ select: { id: true, name: true, data_plants: true } })

        // Itera sobre cada planta para inserir novo registro
        allPlants.forEach(async plant => {
            if (plant.data_plants.length < 100) {


                // Busca últimos registros da planta para inserir novos com base nas últimas datas
                await findLastData({
                    where: { plant_id: plant.id },
                    orderBy: { created_at: 'desc' }

                }).then(res => {
                    new Simulator(plant.id, res)
                })
            }
        })
    })
}