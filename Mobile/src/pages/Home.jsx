const api = require('../utils/api')
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
const { screenWidth, screenHeight } = require('../utils/dimensions')
import { Container, ContainerImage, TextPlantName } from '../Styles';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';




const Home = () => {
    const [dataPlant, setDataPlant] = useState({})

    let setOrderDataInApi = 1
    const fetchData = async () => {
        try {
            const plantData = await api.get('home', { user_id: global.SessionUser.id, reverse: setOrderDataInApi % 2 == 0 })
            setDataPlant(plantData)
            setOrderDataInApi++

        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }


    // Gatilho inicial para consultas na Api
    useEffect(() => {
        fetchData()
        const interval = setInterval(fetchData, 2000)

        return () => clearInterval(interval)
    }, [])

    const navigation = useNavigation()
    const handleChart = () => {
        navigation.navigate('Statistics')
    }

    return (
        <Container style={styles.background}>
            <Container style={styles.container}>

                <TouchableOpacity style={{ ...styles.statsButton, elevation: 20 }} onPress={handleChart}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <MaterialCommunityIcons name="chart-line-stacked" size={24} color="black" /> */}
                        <Text style={{ fontSize: 20, color: '#2D9831' }}>Estatísticas</Text>
                    </View>
                </TouchableOpacity>


                <TextPlantName style={styles.title_plant}>{dataPlant?.name}</TextPlantName>

                <ContainerImage>
                    <Image
                        source={require("../images/home_page/ligthning.png")}
                        style={styles.ligthning}
                        resizeMode="contain"
                    />
                    <Text style={{ ...styles.label_text_style }}>{dataPlant?.data?.illumination}%</Text>
                </ContainerImage>

                <ContainerImage>
                    <Image
                        source={require("../images/home_page/plant.png")}
                        style={styles.plant}
                        resizeMode="contain"
                    />
                    <Text style={{ ...styles.label_text_style }}>{dataPlant?.data?.weight} Kg</Text>
                </ContainerImage>

                <ContainerImage style={{ flexDirection: 'row' }}>
                    <ContainerImage>
                        <Image
                            source={require("../images/home_page/thermometer.png")}
                            style={styles.thermometer}
                            resizeMode="contain"
                        />
                        <Text style={{ ...styles.label_text_style }}>{dataPlant?.data?.celsius} ºC</Text>
                    </ContainerImage>

                    <ContainerImage>
                        <Image
                            source={require("../images/home_page/sensor.png")}
                            style={styles.sensor}
                            resizeMode="contain"
                        />
                        <Text style={{ ...styles.label_text_style }}>{dataPlant?.data?.humidity}% MC</Text>
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
        width: screenWidth * 0.95,
        height: screenHeight,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#2D9831',
    },
    statsButton: {
        margin: 25,
        backgroundColor: '#ffffff', // cor de fundo do botão
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
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
})

export default Home