import { useNavigation } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import React, { useEffect, useState } from 'react';
import { Container, Card, LabelText, TextInput } from '../Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';

const api = require('../utils/api');
const { screenWidth, screenHeight } = require('../utils/dimensions');

const Home = (data) => {
    const user = data.route.params
    const navigation = useNavigation()

    const defineUserName = (() => {
        const name = (user?.name || '').split(' ')[0]
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        return formattedName
    })()

    const [error, setError] = useState('');
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPlantName, setNewPlantName] = useState('');
    const [modalNewPlant, setModalNewPlant] = useState(false);
    const [selectedPlantDelete, setSelectedPlantDelete] = useState(null);
    const [modalDeletePlant, setModalDeletePlant] = useState(false);


    const defineError = (message, time = 2500) => {
        setError(message)
        setTimeout(() => setError(''), time)
        console.error(message)
    }


    /**
     * Gatilho inicial para consultas na Api
     */
    const fetchData = async () => {
        try {
            await api.get(`/plants?user_id=${user?.id}`)
                .then(res => setPlants(res.result))

        } catch (err) {
            defineError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
        const interval = setInterval(fetchData, 10 * 1000)
        return () => clearInterval(interval)
    }, [])



    /**
     * Adiciona uma nova planta do usuário
     */
    const addNewPlant = async () => {
        if (!newPlantName) {
            defineError('Preencha os campos corretamente')
            return
        }

        try {
            await api.post('/plants', {
                user_id: user?.id,
                name: newPlantName,
            })
            await fetchData()
            setNewPlantName('')
            setModalNewPlant(false) // Desabilitar

        } catch (err) {
            defineError(err.response?.data?.message || 'Erro ao adicionar planta')
        }
    }


    /**
     * Realizar a exclusão da planta selecionada
     */
    const deletePlant = async () => {
        try {
            await api.destroy(`/plants/${selectedPlantDelete.id}`)
            setPlants(plants.filter(plant => plant.id !== selectedPlantDelete.id))
            setModalDeletePlant(false) // Desabilitar 
            setSelectedPlantDelete(null)

        } catch (error) {
            defineError(error.response?.data || 'Erro ao deletar planta')
        }
    }


    /**
     * Renderização dos componentes de cada Planta
    */
    const handlerDataPlant = (plant_id, plant_name) => navigation.navigate('DataPlant', { plant_id, plant_name })
    const renderItem = ({ item }) => (
        <Card style={styles.frontCardPlant}>
            <TouchableOpacity onPress={() => { handlerDataPlant(item.id, item.name) }}>
                <Text style={{ ...styles.textStyle, fontSize: 18, color: '#78d600' }}>{item.name}</Text>
            </TouchableOpacity>
        </Card>
    );

    const renderHiddenItem = (data) => (
        <Card style={styles.backCardPlant}>
            <TouchableOpacity
                style={styles.deleteBtnCard}
                onPress={() => {
                    setSelectedPlantDelete(data?.item)
                    setModalDeletePlant(true)
                }}>
                <Text style={styles.textStyle}>Deletar</Text>
            </TouchableOpacity>
        </Card>
    );



    return (
        <Container style={styles.background}>
            <Container style={styles.container}>
                <Container style={styles.navibar}>
                    <Text style={{ ...styles.textStyle, ...styles.title }}>
                        Olá, {defineUserName}!
                    </Text>
                    <TouchableOpacity style={styles.buttonNavibar} onPress={() => { setModalNewPlant(true) }}>
                        <Text style={{ ...styles.textStyle, fontSize: 16 }}>Adicionar</Text>
                    </TouchableOpacity>
                </Container>
                {loading ? (
                    <Text style={{ ...styles.textStyle, fontSize: 18, color: '#777', marginTop: 25 }}>
                        Carregando plantas...
                    </Text>
                ) : plants.length === 0 ? (
                    <Text style={{ ...styles.textStyle, fontSize: 18, color: '#777', marginTop: 25 }}>
                        Nenhuma plantinha cadastrada
                    </Text>
                ) : (
                    <SwipeListView
                        style={styles.listPlants}
                        data={plants}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-85}
                        disableRightSwipe
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </Container>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalDeletePlant}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Deseja deletar {selectedPlantDelete?.name}?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonCancel]}
                                onPress={() => {
                                    setModalDeletePlant(false); // Desabilitar Modal
                                    setSelectedPlantDelete(null);
                                }}>
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonDelete]}
                                onPress={deletePlant}>
                                <Text style={styles.textStyle}>Deletar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalNewPlant}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <LabelText style={styles.labelText}>Nome</LabelText>
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
                                    setModalNewPlant(false); // Desabilitar Modal
                                    setSelectedPlantDelete(null);
                                }}>
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.buttonDelete]} onPress={addNewPlant}>
                                <Text style={styles.textStyle}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </Container>
    );
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
        justifyContent: 'space-between',
        width: screenWidth,
        minHeight: screenHeight * 0.15,
        maxHeight: screenHeight * 0.15
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
    title: {
        color: '#000',
        fontSize: 20,
    },
    textStyle: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textInput: {
        borderWidth: 3,
        width: screenWidth * 0.6,
        borderColor: 'rgba(0,0,0,0.2)',
        backgroundColor: '#ddd',
    },
    labelText: {
        fontSize: 18,
        color: '#000',
        textAlign: 'left',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginRight: 180
    },

    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
})

export default Home