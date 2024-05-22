const api = require('../utils/api')
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
const { screenWidth, screenHeight } = require('../utils/dimensions')
import { Container, Card, LabelText, TextInput } from '../Styles';
import { StyleSheet, View, Text, TouchableOpacity, Appearance, Modal } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';


const colorTextInput = Appearance.getColorScheme() === 'dark' ? '#000' : '#000'

const Home = () => {
    const navigation = useNavigation()
    const [error, setError] = useState('')
    const [newPlantName, setNewPlantName] = useState('')
    const [selectedProductId, setSelectedPlantId] = useState(null)
    const [modalVisible, setModalVisible] = useState({ active: false, type: '' })



    /**
     * Gatilho inicial para consultas na Api
     */
    const [user, setUser] = useState({})
    const [plants, setPlants] = useState([])

    const fetchData = async () => {
        try {
            console.log('User ID: ', await AsyncStorage.getItem('user_id'))
            await api.get(`/users/${await AsyncStorage.getItem('user_id')}`)
                .then(async res => {
                    await setPlants(res.data.plants)
                    console.log(plants)

                    delete res.data.plants
                    setUser(res.data)
                    console.log('Dados do usuário', res.data)
                })

        } catch (error) {
            console.error(JSON.stringify(error.response.data))
        }
    }
    useEffect(() => {
        fetchData()
        const interval = setInterval(fetchData, 20000)

        return () => clearInterval(interval)
    }, [])





    /**
     * Adiciona uma nova planta do usuário
     */
    const addNewPlant = () => {
        setModalVisible({ active: true, type: 'newPlant' })
    }


    /**
     * Realizar a exclusão da planta selecionada
     */
    const confirmDeletePlant = async (id) => {
        // Define planta selecionada para exclusão
        setSelectedPlantId(id)
        setModalVisible({ active: true, type: 'confirmDelete' })
    }
    const deletePlant = async () => {
        await setPlants(plants.filter(plant => plant.id !== selectedProductId)) // Deleta planta selecionada

        // Fecha Modal e nenhuma planta selecionada
        setModalVisible({ active: false, type: '' })
        setSelectedPlantId(null)
    };


    /**
     * Renderização dos componentes de cada Planta
     */
    const handlerDataPlant = () => navigation.navigate('DataPlant')
    const renderItem = ({ item }) => (
        <Card style={styles.frontCardPlant}>
            <TouchableOpacity onPress={handlerDataPlant}>
                <Text style={{ ...styles.textStyle, fontSize: 18, color: '#78d600' }}>{item.name}</Text>
            </TouchableOpacity>
        </Card>
    )
    const renderHiddenItem = (data) => (
        <Card style={styles.backCardPlant}>
            <TouchableOpacity style={styles.deleteBtnCard} onPress={() => confirmDeletePlant(data.item.id)}>
                <Text style={styles.textStyle}>Deletar</Text>
            </TouchableOpacity>
        </Card>
    );


    return (
        <Container style={styles.background}>
            <Container style={styles.container}>

                <Container style={styles.navibar}>
                    <TouchableOpacity style={styles.buttonNavibar} onPress={addNewPlant}>
                        <Text style={{ ...styles.textStyle, fontSize: 16 }}>Adicionar</Text>
                    </TouchableOpacity>
                </Container>


                {
                    plants.length === 0 ? (
                        <Text style={{ ...styles.textStyle, fontSize: 16 }}>Nenhuma plantinha cadastrada</Text>

                    ) : (
                        <SwipeListView
                            style={styles.listPlants}
                            data={plants}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-85}
                            disableRightSwipe
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                    )
                }


            </Container>



            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible.active}
                onRequestClose={() => {
                    setModalVisible({ active: false, type: '' })
                    setSelectedPlantId(null)
                }}
            >

                {
                    modalVisible.type === 'confirmDelete' ?

                        // Confirmação de exclusão
                        (
                            <View style={styles.modalContainer}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Deseja deletar esta planta?</Text>
                                    <View style={styles.modalButtons}>
                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonCancel]}
                                            onPress={() => {
                                                setModalVisible({ active: false, type: '' })
                                                setSelectedPlantId(null)
                                            }}
                                        >
                                            <Text style={styles.textStyle}>Cancelar</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonDelete]}
                                            onPress={deletePlant}
                                        >
                                            <Text style={styles.textStyle}>Deletar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                        ) : modalVisible.type === 'newPlant' ? (

                            <View style={styles.modalContainer}>
                                <View style={styles.modalView}>

                                    <LabelText style={{ ...styles.labelText }}>Nome</LabelText>
                                    <TextInput
                                        value={newPlantName}
                                        style={[styles.textInput, error && styles.errorInput]}
                                        onChangeText={setNewPlantName}
                                        placeholder="Nome da planta"
                                    />

                                    <Text style={styles.errorText}>{error}</Text>

                                    <View style={styles.modalButtons}>
                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonCancel]}
                                            onPress={() => {
                                                setModalVisible({ active: false, type: '' })
                                                setSelectedPlantId(null)
                                            }}
                                        >
                                            <Text style={styles.textStyle}>Cancelar</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonDelete]}
                                            onPress={() => { }}
                                        >
                                            <Text style={styles.textStyle}>Adicionar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                        ) : undefined
                }

            </Modal>
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
        backgroundColor: '#eee',
        width: screenWidth * 0.95,
    },
    navibar: {
        bottom: 20,
        elevation: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        width: screenWidth,
    },
    buttonNavibar: {
        borderRadius: 15,
        backgroundColor: '#78d600',
        justifyContent: 'center',
        width: screenWidth * 0.55,
        height: screenHeight * 0.05,
    },
    listPlants: {
        height: screenHeight * 0.75
    },



    // Card da Planta
    frontCardPlant: {
        margin: 5,
        elevation: 8,
        paddingLeft: 15,
        borderRadius: 50,
        justifyContent: 'center',
        width: screenWidth * 0.8,
        backgroundColor: '#fff',
        height: screenHeight * 0.08,
    },
    backCardPlant: {
        flex: 1,
        paddingLeft: 15,
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
    },


    deleteBtnCard: {
        margin: 5,
        right: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth * 0.17,
        height: screenHeight * 0.075,
        backgroundColor: 'red',
    },
    backTextWhite: {
        color: '#FFF',
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        padding: 35,
        elevation: 5,
        shadowRadius: 4,
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowColor: '#000',
        shadowOpacity: 0.25,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    modalText: {
        fontSize: 16,
        color: '#000',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        padding: 10,
        elevation: 2,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    buttonCancel: {
        backgroundColor: '#2196F3',
    },
    buttonDelete: {
        backgroundColor: '#FF0000',
    },
    textStyle: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textInput: {
        borderWidth: 3,
        borderColor: '#78d600',
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    labelText: {
        fontSize: 18,
        color: '#78d600',
        textAlign: 'left',
    },
})

export default Home