const api = require('../services/api')
import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View } from 'react-native';
import { Container, ContainerChart, HeaderChart } from '../Styles';




const DynamicChart = () => {
    const [data, setData] = useState([0, 0, 0, 0, 0])
    const [labels, setLabels] = useState(['', '', '', '', ''])
    const [selectedChartType, setSelectedChartType] = useState('line');


    const setTypeChart = async (itemValue) => {
        let statistic_data = await api.get(`/data?type=${itemValue}`)

        setData(statistic_data.data)
        setLabels(statistic_data.label)
        setSelectedChartType(itemValue)
    }


    const pickerItemSelected = '#4fd155'
    const newPickerItem = (itens = []) => {
        const result = []
        itens.forEach(item => {
            const bg = item.value === selectedChartType ? pickerItemSelected : undefined

            result.push(<Picker.Item label={item.label} value={item.value} style={styles.picker_item(bg)} />)
        })

        return result
    }



    useEffect(() => {
        setTypeChart("weight")
    }, [])

    return (
        <Container style={styles.background}>
            <ContainerChart style={styles.container_chart}>

                <HeaderChart style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...styles.title, width: '35%' }}>Dados:</Text>

                    <Picker
                        style={styles.picker}
                        selectedValue={selectedChartType}
                        onValueChange={(itemValue, itemIndex) =>
                            setTypeChart(itemValue)
                        }
                    >
                        {newPickerItem([
                            { label: 'Peso', value: 'weight' },
                            { label: 'Iluminação', value: 'lighting' },
                            { label: 'Umidade', value: 'humidity' },
                            { label: 'Temperatura', value: 'temperature' },
                        ])}
                    </Picker>
                </HeaderChart>


                <LineChart
                    data={{
                        labels: labels,
                        datasets: [{ data: data }]
                    }}
                    width={370}
                    height={600}
                    chartConfig={{
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        decimalPlaces: 2, // Casas decimais dos valores
                        color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `#2D9831`,
                        propsForDots: {
                            r: "5",
                            strokeWidth: "1",
                            stroke: "#2D9831"
                        }
                    }}

                    style={styles.chart}
                />
            </ContainerChart>
        </Container>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#2D9831',
    },
    container_chart: {
        borderRadius: 10,
    },
    title: {
        fontSize: 25,
        color: '#2D9831',
        fontWeight: 'bold',
    },
    picker: {
        width: '55%',
        height: '1%',
        elevation: 8,
        maxWidth: 180,
        maxHeight: 10,
        borderRadius: 10,
        backgroundColor: '#4fb055'
    },
    picker_item: (bg) => {
        return {
            backgroundColor: bg ? bg : 'white', // 'rgba(45,152,49,0.7)',
            color: bg ? 'white' : '#2D9831', // 'white',
            fontWeight: 'bold',
            fontSize: 15,
        }
    },
    chart: {
        borderRadius: 10,
        maxWidth: '200px',
    },
});

export default DynamicChart;
