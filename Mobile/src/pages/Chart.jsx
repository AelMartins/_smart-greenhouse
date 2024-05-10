import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { StyleSheet, Text, View } from 'react-native';
import { Container, ContainerChart, HeaderChart } from '../Styles';
import { Picker } from '@react-native-picker/picker';



const DynamicChart = () => {
    const [data, setData] = useState([0, 0, 0, 0, 0])
    const [labels, setLabels] = useState(['', '', '', '', ''])
    const [selectedChartType, setSelectedChartType] = useState('line');


    const setTypeChart = (itemValue) => {
        let data
        if (itemValue === "weight") {
            data = [100, 750, 450, 150, 325, 200, 250, 650, 840, 300, 523, 400]

        } else if (itemValue === "lighting") {
            data = [437, 123, 150, 325, 650, 840, 300, 523, 400]

        } else if (itemValue === "humidity") {
            data = [86, 12, 150, 53, 20, 523, 400]

        } else if (itemValue === "temperature") {
            data = [76, 750, 250, 650, 840, 300, 523, 400]

        }
        setData(data)
        setLabels(['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'])
        setSelectedChartType(itemValue)
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
                        style={{ ...styles.picker, width: '55%' }}
                        selectedValue={selectedChartType}
                        onValueChange={(itemValue, itemIndex) =>
                            setTypeChart(itemValue)
                        }>
                        <Picker.Item label="Peso" value="weight" style={styles.picker_item} />
                        <Picker.Item label="Iluminação" value="lighting" style={styles.picker_item} />
                        <Picker.Item label="Umidade" value="humidity" style={styles.picker_item} />
                        <Picker.Item label="Temperatura" value="temperature" style={styles.picker_item} />
                    </Picker>
                </HeaderChart>


                <LineChart
                    data={{
                        labels: labels,
                        datasets: [{ data: data }]
                    }}
                    width={370}
                    height={600}
                    yAxisLabel=""
                    chartConfig={{
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        decimalPlaces: 2, // Casas decimais dos valores
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                        style: {
                            borderRadius: 1,
                        },
                        propsForDots: {
                            r: "5",
                            strokeWidth: "2",
                            stroke: "#78d600"
                        }
                    }}
                    bezier
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
        maxWidth: 180,
    },
    picker_item: {
        color: '#2D9831',
        fontWeight: 'bold',
        fontSize: 17,
    },
    chart: {
        borderRadius: 10,
        maxWidth: '200px',
    },
});

export default DynamicChart;
