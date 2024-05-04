import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { StyleSheet, Text } from 'react-native';
import { Container } from '../Styles';


const DynamicChart = () => {
    const [data, setData] = useState([0, 0, 0, 0, 0])
    const [labels, setLabels] = useState(['', '', '', '', ''])

    useEffect(() => {
        const fetchData = async () => {
            const response = { data: [100, 750, 450, 150, 325, 200, 250, 650, 840, 300, 350, 400], labels: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'] }
            const { data, labels } = response
            setData(data)
            setLabels(labels)
        };

        fetchData()
        const interval = setInterval(fetchData, 10000)

        return () => clearInterval(interval)
    }, [])

    return (
        <Container style={styles.background}>
            <Container style={styles.container}>

                <Text style={styles.title}>Dynamic Chart</Text>

                <LineChart
                    data={{
                        labels: labels,
                        datasets: [{ data: data }]
                    }}
                    width={385}
                    height={500}
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
            </Container>
        </Container>
    );
};

const styles = StyleSheet.create({
    background: {
        padding: 1,
        backgroundColor: '#2D9831',
    },
    container: {
        flex: 1,
        width: '110%',
        backgroundColor: 'red',
        borderRadius: 10,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 22,
        color: '#2D9831',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    chart: {
        borderRadius: 10,
    },
});

export default DynamicChart;
