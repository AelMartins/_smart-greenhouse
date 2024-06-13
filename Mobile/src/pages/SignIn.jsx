import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, ImageBackground, Text, } from 'react-native';
import { Container, ButtonCard, Button, ButtonText, TextInput, LabelText } from '../Styles';

const api = require('../utils/api')

const SignIn = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [messageRequest, setMessageRequest] = useState(null);
    const [password, setPassword] = useState('');


    const defineMessage = (message, set, time = 2500) => {
        set(message)
        setTimeout(() => set(''), time)
        console.log(JSON.stringify(message))
    }

    const handleSignIn = async () => {
        if (!email || !password) {
            defineMessage({ error: true, msg: 'Preencha os campos corretamente' }, setMessageRequest)
            return
        }

        setMessageRequest({ msg: 'Carregando...' })

        await api.post(`/users/login`, { email, password })
            .then(async res => {
                defineMessage({ msg: `Login realizado com sucesso` }, setMessageRequest, 1500)

                // Adiciona dados do usuário a sessão
                navigation.navigate('Home', res)
                setEmail('')
                setPassword('')

            })
            .catch(err => defineMessage({ error: true, msg: err?.response?.data?.message || 'Erro ao realizar Login' }, setMessageRequest))
    };

    const handleSignUp = () => {
        navigation.navigate('SignUp');
    };

    return (
        <ImageBackground
            source={require('../images/background.jpg')} // Substitua pelo caminho da sua imagem
            style={styles.container_background}
            blurRadius={3}
        >
            <Container style={styles.container_background}>
                <LabelText style={styles.labelText}>E-mail</LabelText>
                <TextInput
                    value={email}
                    style={[styles.textInput, messageRequest?.error && styles.errorInput]}
                    onChangeText={setEmail}
                    placeholder="Digite seu e-mail"
                />

                <LabelText style={styles.labelText}>Senha</LabelText>
                <TextInput
                    value={password}
                    style={[styles.textInput, messageRequest?.error && styles.errorInput]}
                    onChangeText={setPassword}
                    placeholder="Senha"
                    secureTextEntry={true}
                />

                <Text style={messageRequest?.error ? styles.errorText : styles.loadingRequestText}>{messageRequest?.msg || ''}</Text>

                <ButtonCard style={styles.buttonCard}>
                    <Button style={styles.button('signin')} onPress={() => handleSignIn()}>
                        <ButtonText style={styles.buttonText('signin')}>Entrar</ButtonText>
                    </Button>

                    <Button style={styles.button()} onPress={() => handleSignUp()}>
                        <ButtonText style={styles.buttonText()}>Inscreva-se</ButtonText>
                    </Button>
                </ButtonCard>

            </Container>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container_background: {
        flex: 1,
        justifyContent: 'center',
    },
    labelText: {
        color: '#78d600',
        textShadowRadius: 4,
        textShadowColor: 'black',
        textShadowOffset: { width: -2, height: 2 }, // Deslocamento da sombra
    },
    textInput: {
        borderWidth: 3,
        borderColor: '#78d600',
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    buttonCard: {
        marginTop: 150,
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
        fontSize: 16,
        marginBottom: 10,
    },
    loadingRequestText: {
        fontSize: 18,
        color: '#78d600',
        marginBottom: 10,
        fontWeight: 'bold',
        textShadowRadius: 4,
        textShadowColor: 'black',
        textShadowOffset: { width: -2, height: 2 }, // Deslocamento da sombra

    },
});

export default SignIn;