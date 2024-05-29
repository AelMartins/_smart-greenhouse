const api = require('../utils/api');
import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Container, Header } from '../Styles';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View } from 'react-native';
const { screenWidth, screenHeight } = require('../utils/dimensions');



const Statistics = (data) => {
    const { plant_id, plant_name } = data.route.params

    const defaultDataChart = {
        labels: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
        datasets: [{ data: [0, 0, 0, 0, 0] }]
    }

    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [dataChart, setDataChart] = useState(defaultDataChart)
    const [selectedChartData, setSelectedChartData] = useState('weight')


    // Gatilho inicial para consultas na Api
    const fetchData = async () => {
        // Caso já esteja sendo buscado, não iniciará outro processo
        if (process.env.FETCHDATA_IN_PROGRESS == '1') return 'in_progress'

        process.env.FETCHDATA_IN_PROGRESS = '1'
        try {
            await api.get(`/data-plants/${plant_id}`)
                .then(res => {
                    if (res.result.length > 0) {
                        const data = res.result.map(item => item[selectedChartData])
                        setDataChart({
                            labels: defaultDataChart.labels,
                            datasets: data.length > 0 ? [{ data }] : defaultDataChart.datasets
                        })
                        setMessage(null)

                    } else {
                        throw new Error('Nenhum dado registrado')
                    }
                })

        } catch (error) {
            if (error?.response?.status && error?.response?.status !== 404) await fetchData()

            const messageError = error?.response?.data?.message || error.message
            setMessage(messageError)

        } finally {
            setLoading(false)
            process.env.FETCHDATA_IN_PROGRESS = '0'
        }
    }

    useEffect(() => {
        fetchData()
        const interval = setInterval(fetchData, 1 * 1000)
        return () => clearInterval(interval)
    }, [selectedChartData])


    // Define tipo de Dado exibido no Gráfico
    const handlePickerChange = async (itemValue) => {
        setSelectedChartData(itemValue)
        setLoading(true)


        let inProgressFetchData
        do {
            fetchData().then(res => inProgressFetchData = res)
        } while (inProgressFetchData == 'in_progress')
    }

    // Renderiza os itens do seletor de Dados
    const renderPickerItems = (items = []) => {
        return items.map(item => (
            <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
                style={styles.picker_item(item.value === selectedChartData ? '#4fd155' : undefined)}
            />
        ))
    }


    return (
        <Container style={styles.background}>
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Text style={styles.title}>Dados de {plant_name}:</Text>
                    {loading ? (
                        <Text style={styles.messageText}>Carregando...</Text>
                    ) : !message ? (

                        <View style={styles.picker_container}>
                            <Picker
                                style={styles.picker}
                                selectedValue={selectedChartData}
                                onValueChange={handlePickerChange}>
                                {renderPickerItems([
                                    { label: 'Peso', value: 'weight' },
                                    { label: 'Iluminação', value: 'illumination' },
                                    { label: 'Umidade', value: 'humidity' },
                                    { label: 'Temperatura', value: 'celsius' },
                                ])}
                            </Picker>
                        </View>
                    ) : (
                        <Text style={styles.messageText}>{message}</Text>
                    )}
                </Header>


                <LineChart
                    width={screenWidth * 0.95}
                    height={screenHeight * 0.78}
                    data={dataChart}
                    chartConfig={{
                        propsForDots: {
                            r: "5",
                            strokeWidth: "1",
                            stroke: "#2D9831",
                        },
                        decimalPlaces: 2,
                        backgroundGradientTo: '#fff',
                        backgroundGradientFrom: '#fff',
                        labelColor: (opacity = 1) => '#2D9831',
                        color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
                    }}

                    style={styles.line_chart}
                />
            </Container>
        </Container>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#2D9831',
    },
    container: {
        borderRadius: 10,
        backgroundColor: 'white',
        width: screenWidth * 0.95,
        height: screenHeight * 0.85,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        width: screenWidth * 0.95,
        height: screenHeight * 0.1,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    title: {
        fontSize: 20,
        color: '#2D9831',
        fontWeight: 'bold',
        width: screenWidth * 0.45,
    },
    picker_container: {
        elevation: 5,
        borderRadius: 10,
        overflow: 'hidden', // Garante que o borderRadius seja aplicado corretamente ao Picker
        justifyContent: 'center',
        width: screenWidth * 0.4,
        height: screenHeight * 0.032,
    },
    picker: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: '#4fb055'
    },
    picker_item: (bg) => {
        return {
            fontSize: 14,
            fontWeight: 'bold',
            color: bg ? 'white' : '#2D9831',
            backgroundColor: bg ? bg : 'white',
        }
    },
    messageText: {
        fontSize: 16,
        color: '#2D9831',
        fontWeight: '500',
        textAlign: 'center',
        width: screenWidth * 0.45,
    },
    line_chart: {
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0)',
    },
});

export default Statistics