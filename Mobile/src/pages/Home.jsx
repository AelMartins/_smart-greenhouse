import React, { useEffect, useState } from 'react';
import { Text } from "react-native"
import { Container, ContainerImage, Image } from '../Styles';
import { StyleSheet } from 'react-native';



const Home = () => {
    const [dataPlant, setDataPlant] = useState({})

    // useEffect(async () => {
    //     const data = {
    //         lighting: Math.floor(Math.random() * 100),
    //         weight: (Math.random() * 100).toFixed(1),
    //         humidity: 10,
    //         temperature: 40,
    //     }
    //     await setDataPlant(data)
    //     console.log(dataPlant)
    // })


    return (
        <Container style={styles.background}>
            <Container style={styles.container}>

                <Text style={styles.title_plant}>{dataPlant?.name || 'Nome da Planta'}</Text>


                <ContainerImage>
                    <Image
                        source={require("../images/home_page/ligthning.png")}
                        style={styles.ligthning.image}
                        resizeMode="contain"
                    />
                    <Text style={{ ...styles.label_text_style, ...styles.ligthning.position_text }}>{dataPlant?.lighting || '100'}%</Text>
                </ContainerImage>

                <ContainerImage>
                    <Image
                        source={require("../images/home_page/plant.png")}
                        style={styles.plant.image}
                        resizeMode="contain"
                    />
                    <Text style={{ ...styles.label_text_style, ...styles.plant.position_text }}>{dataPlant?.weight || '20.0'} Kg</Text>
                </ContainerImage>

                <ContainerImage>
                    <Image
                        source={require("../images/home_page/sensor.png")}
                        style={styles.sensor.image}
                        resizeMode="contain"
                    />
                    <Text style={{ ...styles.label_text_style, ...styles.sensor.position_text }}>{dataPlant?.humidity || '80'}% MC</Text>
                </ContainerImage>

                <ContainerImage>
                    <Image
                        source={require("../images/home_page/thermometer.png")}
                        style={styles.thermometer.image}
                        resizeMode="contain"
                    />
                    <Text style={{ ...styles.label_text_style, ...styles.thermometer.position_text }}>{dataPlant?.temperature || '18'} ºC</Text>
                </ContainerImage>
            </Container>
        </Container>
    )
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#2D9831',
    },
    title_plant: {
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold',
        right: 65,
        bottom: 15
    },
    label_text_style: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    ligthning: {
        image: {
            height: '45%',
        },
        position_text: {
            bottom: 60,
            left: 80,
        },
    },
    plant: {
        image: {
            top: 70,
            height: '150%',
        },
        position_text: {
            top: 80,
        },
    },
    sensor: {
        image: {
            height: '35%',
            top: 165,
            left: 90,
        },
        position_text: {
            top: 165,
            left: 90,
        },
    },
    thermometer: {
        image: {
            height: '40%',
            top: 5,
            right: 90,
        },
        position_text: {
            right: 90,
        },
    },
})

export default Home