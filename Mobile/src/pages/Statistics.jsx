const api = require('../utils/api');
import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Container, HeaderChart } from '../Styles';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View } from 'react-native';
const { screenWidth, screenHeight } = require('../utils/dimensions');



const Statistics = () => {
    const [dataChart, setDataChart] = useState({
        labels: ['', '', '', '', ''],
        datasets: [{ data: [0, 0, 0, 0, 0] }]
    })
    const [selectedChartData, setSelectedChartData] = useState('weight')


    // Gatilho inicial para consultas na Api
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const statisticData = await api.get(`/data?type=${selectedChartData}`)
                const statisticData = await api.get('/data', { user_id: global.SessionUser.id, type: selectedChartData })
                setDataChart({
                    labels: statisticData.labels,
                    datasets: [{ data: statisticData.data }]
                })

            } catch (error) {
                console.error('Error fetching data:', error)
            }
        };

        fetchData()
        const interval = setInterval(fetchData, 2000)

        return () => clearInterval(interval)
    }, [selectedChartData])

    // Define tipo de Dado exibido no Gráfico
    const handlePickerChange = (itemValue) => {
        setSelectedChartData(itemValue)
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

                <HeaderChart style={styles.header_chart}>
                    <Text style={styles.title}>Dados:</Text>

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
                </HeaderChart>

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
    header_chart: {
        alignItems: 'center',
        flexDirection: 'row',
        width: screenWidth * 0.95,
        height: screenHeight * 0.08,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    title: {
        fontSize: 25,
        color: '#2D9831',
        fontWeight: 'bold',
        width: screenWidth * 0.35,
    },
    picker_container: {
        elevation: 5,
        borderRadius: 10,
        overflow: 'hidden', // Garante que o borderRadius seja aplicado corretamente ao Picker
        justifyContent: 'center',
        width: screenWidth * 0.4,
        height: screenHeight * 0.03,
    },
    picker: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: '#4fb055'
    },
    picker_item: (bg) => {
        return {
            fontSize: 15,
            fontWeight: 'bold',
            color: bg ? 'white' : '#2D9831',
            backgroundColor: bg ? bg : 'white',
        }
    },
    line_chart: {
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0)',
    },
});

export default Statistics