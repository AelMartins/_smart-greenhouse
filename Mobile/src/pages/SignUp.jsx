import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, TextInput, Text, View } from 'react-native';
const { screenWidth, screenHeight } = require('../utils/dimensions')
import { Container, ButtonCard, Button, ButtonText } from '../Styles';


const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const [error, setError] = useState('');


    const navigation = useNavigation()
    const handleSignIn = () => {
        navigation.navigate('SignIn')
    }


    useEffect(() => {
        const validPassword = () => {
            if (password !== confirmedPassword) {
                setError('As senhas não coincidem')
            } else {
                setError('')
            }
        }

        const interval = setInterval(validPassword, 0)

        return () => clearInterval(interval)

        console.log('teste senha')
    }, [confirmedPassword])


    return (
        <Container style={styles.container}>
            <Text style={styles.registerText}>
                Acompanhe o crescimento do seu jardim!
                <Text style={{ fontSize: 18, color: '#78d600', }}>Cadastre-se</Text> e monitore o crescimento das suas plantinhas.
            </Text>

            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nome"
            />

            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="E-mail"
            />

            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Senha"
                secureTextEntry={true}
            />

            <TextInput
                style={styles.input}
                value={confirmedPassword}
                onChangeText={setConfirmedPassword}
                placeholder="Confirme sua Senha"
                secureTextEntry={true}
            />

            <Text style={styles.errorText}>{error}</Text>

            <ButtonCard style={styles.buttonCard}>
                <Button style={styles.button()} onPress={() => handleSignIn()}>
                    <ButtonText style={styles.buttonText()}>Cadastre-se</ButtonText>
                </Button>
            </ButtonCard>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: screenHeight,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    registerText: {
        width: screenWidth * 0.8,
        fontSize: 16,
        color: '#000',
        marginBottom: 80,
    },
    labelText: {
        color: '#78d600',
        textShadowRadius: 4,
        textShadowColor: 'black',
        textShadowOffset: { width: -2, height: 2 }, // Deslocamento da sombra
    },
    input: {
        margin: 10,
        fontSize: 17,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: '#78d600',
        width: screenWidth * 0.8,
        height: screenHeight * 0.05,
    },
    buttonCard: {
        marginTop: 80,
    },
    button: (type) => {
        return {
            borderWidth: 3,
            borderColor: '#78d600',
            backgroundColor: type === 'signin' ? 'rgba(255,255,255,0.9)' : '#78d600',
        }
    },
    buttonText: (type) => {
        return {
            color: type === 'signin' ? '#78d600' : '#fff'
        }
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default SignUp;