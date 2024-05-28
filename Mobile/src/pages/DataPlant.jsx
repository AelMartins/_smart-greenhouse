import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, ContainerImage, TextPlantName } from '../Styles';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const api = require('../utils/api')
const { screenWidth, screenHeight } = require('../utils/dimensions');


const DataPlant = (data) => {
    const navigation = useNavigation()
    const [dataPlant, setDataPlant] = useState({})
    const [error, setError] = useState(null)
    const { plant_id, plant_name } = data.route.params
    const handleChart = (plant_id) => navigation.navigate('Statistics', { plant_id, plant_name })


    const fetchData = async () => {
        try {
            await api.get(`/data-plants/last-data/${plant_id}`)
                .then(res => {
                    let { weight, illumination, celsius, humidity } = res.result

                    // Validação da escala de Peso
                    if (weight < 1000) {
                        weight = `${weight} g`;
                    } else {
                        const weightInKg = (weight / 1000).toFixed(2);
                        weight = `${weightInKg} kg`;
                    }

                    const result = {
                        weight,
                        illumination: `${illumination}%`,
                        celsius: `${celsius}ºC`,
                        humidity: `${humidity}% MC`
                    }

                    setDataPlant(result)
                    setError(null)
                })

        } catch (error) {
            const responseError = error?.response?.data?.message
            if (error?.response?.status !== 404) await fetchData()

            setError(responseError)
            console.error(responseError || error.message)
        }
    }

    useEffect(() => {
        fetchData()
        const interval = setInterval(fetchData, 10 * 1000)
        return () => clearInterval(interval)
    }, [])


    return (
        <Container style={styles.background}>
            <Container style={styles.container}>

                <TouchableOpacity style={{ ...styles.statsButton, elevation: 20 }} onPress={() => handleChart(plant_id)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: '#2D9831' }}>Estatísticas</Text>
                    </View>
                </TouchableOpacity>

                <TextPlantName style={styles.title_plant}>{plant_name}</TextPlantName>

                <ContainerImage>
                    <Image
                        source={require("../images/home_page/ligthning.png")}
                        style={styles.ligthning}
                        resizeMode="contain"
                    />
                    <Text style={{ ...styles.label_text_style }}>{dataPlant?.illumination}</Text>
                </ContainerImage>

                <ContainerImage>
                    <Image
                        source={require("../images/home_page/plant.png")}
                        style={styles.plant}
                        resizeMode="contain"
                    />
                    {
                        !error ?
                            <Text style={{ ...styles.label_text_style }}>{dataPlant?.weight}</Text> :
                            <Text style={styles.errorText}>{error}</Text>
                    }



                </ContainerImage>

                <ContainerImage style={{ flexDirection: 'row' }}>
                    <ContainerImage>
                        <Image
                            source={require("../images/home_page/thermometer.png")}
                            style={styles.thermometer}
                            resizeMode="contain"
                        />
                        <Text style={{ ...styles.label_text_style }}>{dataPlant?.celsius}</Text>
                    </ContainerImage>

                    <ContainerImage>
                        <Image
                            source={require("../images/home_page/sensor.png")}
                            style={styles.sensor}
                            resizeMode="contain"
                        />
                        <Text style={{ ...styles.label_text_style }}>{dataPlant?.humidity}</Text>
                    </ContainerImage>
                </ContainerImage>
            </Container>
        </Container>
    )
}

const styles = StyleSheet.create({
    background: {
        width: screenWidth,
        height: screenHeight,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        elevation: 5,
        borderRadius: 20,
        alignItems: 'center',
        width: screenWidth * 0.95,
        justifyContent: 'flex-end',
        backgroundColor: '#2D9831',
    },
    statsButton: {
        margin: 25,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
    },
    label_text_style: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    ligthning: {
        marginTop: 30,
        height: '35%',
    },
    plant: {
        height: '80%',
    },
    sensor: {
        height: '25%',
    },
    thermometer: {
        height: '25%',
    },
    errorText: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    },
})

export default DataPlant