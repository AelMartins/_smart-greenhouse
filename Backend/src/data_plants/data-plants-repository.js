const prisma = require('../../prisma')
const { eachDayOfInterval, format } = require('date-fns');


const findById = async (id) => {
    try {
        const result = await prisma.data_plants.findUnique({ where: { id } })
        return result

    } catch (err) {
        throw err
    }
}

const findByField = async (options) => {
    try {
        const result = await prisma.data_plants.findMany(options)
        return result

    } catch (err) {
        throw err
    }
}

const findAll = async (options) => {
    try {
        const result = await prisma.data_plants.findMany({
            ...options,
            select: {
                id: true,
                plant_id: true,
                illumination: true,
                celsius: true,
                humidity: true,
                weight: true,
                created_at: true,
                updated_at: true,
            }
        })

        return result

    } catch (err) {
        throw err
    }
}

const findLastData = async (options) => {
    try {
        const result = {}
        const fields = ['illumination', 'celsius', 'humidity', 'weight']
        for (const field of fields) {
            let optByField = {
                ...options,
                select: {
                    id: true,
                    plant_id: true,
                    created_at: true,
                    updated_at: true,
                },
                take: 1,
            }
            Object.defineProperty(optByField.where, field, { value: { not: null }, enumerable: true, configurable: true })
            Object.defineProperty(optByField.select, field, { value: true, enumerable: true, configurable: true })

            await findByField(optByField).then(res => {
                Object.defineProperty(result, field, {
                    value: res.length > 0 ? { value: res[0][field], created_at: res[0].created_at, updated_at: res[0].updated_at } : null,
                    enumerable: true,
                    configurable: true
                })
            })

            delete optByField.where[field]
            delete optByField.select[field]
        }

        return result

    } catch (err) {
        throw err
    }
}

const findTypeDataToChart = async (options, type_data) => {
    try {
        let results = await prisma.data_plants.findMany(options)
        results = results.map(item => {
            if (item[type_data]) return item
        }).filter(item => item !== undefined)

        // Filtra e mapeia os dados relevantes
        const data = results.map(item => item[type_data])

        if (data.length === 0) {
            return { result: { labels: [], data: [] } };
        }


        // Pega as datas de criação dos registros
        const dates = results.map(item => item.created_at);

        // Determina o intervalo de tempo dos registros
        const startDate = new Date(Math.min(...dates.map(date => new Date(date))));
        const endDate = new Date(Math.max(...dates.map(date => new Date(date))));

        // Cria um intervalo de dias entre a data inicial e final
        const interval = eachDayOfInterval({ start: startDate, end: endDate });

        // Formata as datas para obter os dias da semana
        const labels = interval.map(date => {
            const mapDays = {
                'Sun': 'Dom',
                'Mon': 'Seg',
                'Tue': 'Ter',
                'Wed': 'Qua',
                'Thu': 'Qui',
                'Fri': 'Sex',
                'Sat': 'Sáb',
            }

            // Traduz o nome dos dias
            return mapDays[format(date, 'eee')]
        });



        return {
            result: {
                labels: Array.from(new Set(labels)), // Remove duplicatas das labels
                data,
            }
        };


    } catch (err) {
        throw err
    }
}

const create = async (payload) => {
    try {
        const result = await prisma.data_plants.create({ data: payload })
        return result

    } catch (err) {
        throw err
    }
}

const destroy = async (id) => {
    try {
        const find = await findById(id)
        if (!find) return

        const result = await prisma.data_plants.delete({ where: { id } })
        return result

    } catch (err) {
        throw err
    }
}

module.exports = {
    findAll,
    findLastData,
    findTypeDataToChart,
    create,
    destroy
}