import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, ContainerImage, TextPlantName } from '../Styles';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




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

    const navigation = useNavigation()
    const handleChart = () => {
        navigation.navigate('Chart')
    }

    return (
        <Container style={styles.background}>
            <Container style={styles.container}>

                <TouchableOpacity style={{ ...styles.statsButton, elevation: 5 }} onPress={handleChart}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="chart-line-stacked" size={24} color="black" />
                        <Text style={{ fontSize: 20, marginLeft: 10, color: '#2D9831' }}>Estatísticas</Text>
                    </View>
                </TouchableOpacity>


                <TextPlantName style={styles.title_plant}>{dataPlant?.name || 'Nome da Planta'}</TextPlantName>

                <ContainerImage>
                    <Image
                        source={require("../images/home_page/ligthning.png")}
                        style={styles.ligthning}
                        resizeMode="contain"
                    />
                    <Text style={{ ...styles.label_text_style }}>{dataPlant?.lighting || '100'}%</Text>
                </ContainerImage>

                <ContainerImage>
                    <Image
                        source={require("../images/home_page/plant.png")}
                        style={styles.plant}
                        resizeMode="contain"
                    />
                    <Text style={{ ...styles.label_text_style }}>{dataPlant?.weight || '20.0'} Kg</Text>
                </ContainerImage>

                <ContainerImage style={{ flexDirection: 'row' }}>
                    <ContainerImage>
                        <Image
                            source={require("../images/home_page/thermometer.png")}
                            style={styles.thermometer}
                            resizeMode="contain"
                        />
                        <Text style={{ ...styles.label_text_style }}>{dataPlant?.temperature || '18'} ºC</Text>
                    </ContainerImage>

                    <ContainerImage>
                        <Image
                            source={require("../images/home_page/sensor.png")}
                            style={styles.sensor}
                            resizeMode="contain"
                        />
                        <Text style={{ ...styles.label_text_style }}>{dataPlant?.humidity || '80'}% MC</Text>
                    </ContainerImage>
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