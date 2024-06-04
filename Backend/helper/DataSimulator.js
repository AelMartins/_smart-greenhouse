const moment = require('moment')
const { create } = require('../src/data_plants/data-plants-repository')

class DataSimulator {
    constructor(plant_id, data) {
        this.PlantId = plant_id
        const { illumination, celsius, humidity, weight } = data

        console.log('\n=============================================================')
        // this.generateIllumination(illumination)
        this.generateTemperature(celsius)
        // this.generateHumidity(humidity)
        // this.generateWeight(weight)
        console.log('=============================================================\n')
    }

    async createData(object) {
        await create(object)
    }

    /**
     * Gera registro de Temperatura simulados
     * Com um período de 1h entre os registros
     * @param {Object} celsius 
     */
    async generateTemperature(celsius = {}) {
        const nextHour = moment(celsius?.created_at || new Date()).add(1, 'hours')
        const hour = nextHour.hours()

        /**
         * Define um padrão básico de temperatura com base na hora do dia
        */
        let baseTemp;
        if (hour >= 6 && hour < 18) {
            // Durante o Dia: Aumenta de manhã até o meio-dia, depois diminui
            baseTemp = 20 + (hour - 6) * 2;

        } else if (hour >= 18 && hour < 24) {
            // Durante a Noite: Diminui após o pôr do sol
            baseTemp = 32 - (hour - 18) * 2;

        } else {
            // Durante a Madrugada: Ajuste para o período da madrugada
            baseTemp = 20 - ((hour + 24 - 18) * 2);
        }


        // Variação aleatória entre -2 e 2 graus
        let variation = (Math.random() * 4 - 2);
        let finalTemp = baseTemp + variation;

        // Temperatura esta dentro dos limites brasileiros
        if (finalTemp < 15) finalTemp = 15;
        if (finalTemp > 40) finalTemp = 40;
        finalTemp = finalTemp.toFixed(1)


        const result = await this.createData({
            plant_id: this.PlantId,
            celsius: parseFloat(finalTemp),
            created_at: nextHour,
            updated_at: nextHour,
        })

        if (this.PlantId == '665e994558cd1309d646fecd') {
            console.log(`Temperatura ID.${this.PlantId}: ${parseFloat(finalTemp)}ºC // Variação de Tempo: ${1}h`)
        }
        return result
    }
}

module.exports = DataSimulator