import { useState } from 'react';
const api = require('../utils/api')
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, ImageBackground, Text } from 'react-native';
const { screenWidth, screenHeight } = require('../utils/dimensions')
import { Container, ButtonCard, Button, ButtonText, TextInput, LabelText } from '../Styles';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation();

    const handleSignIn = async () => {
        await api.post('/login', { email, password })
            .then(res => {
                global.SessionUser = res
                setEmail('')
                setPassword('')
            navigation.navigate('Home');
            })
            .catch(err => {
                console.error(err)
                setError(err.message);
                setTimeout(() => setError(''), 5000)
            })
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
                    style={[styles.textInput, error && styles.errorInput]}
                    onChangeText={setEmail}
                    placeholder="Digite seu e-mail"
                />

                <LabelText style={styles.labelText}>Senha</LabelText>
                <TextInput
                    value={password}
                    style={[styles.textInput, error && styles.errorInput]}
                    onChangeText={setPassword}
                    placeholder="Senha"
                    secureTextEntry={true}
                />

                <Text style={styles.errorText}>{error}</Text>

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
        marginBottom: 10,
    },
});

export default SignIn;