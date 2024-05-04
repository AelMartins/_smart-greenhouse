import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, ImageBackground, Text } from 'react-native';
import { Card, ButtonCard, Button, ButtonText, TextInput, LabelText } from '../Styles';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation();

    const handleSignIn = () => {
        if (email === '' && password === '') {
            navigation.navigate('Chart');

        } else {
            setError('E-mail e/ou senha incorretos!');
            setTimeout(() => setError(''), 5000)
        }
    };

    const handleSignUp = () => {
        navigation.navigate('SignUp');
    };

    return (
        <ImageBackground
            source={require('../images/background.jpg')} // Substitua pelo caminho da sua imagem
            style={styles.background}
            blurRadius={3}
        >
            <Card style={styles.card}>
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

                {error && <Text style={styles.errorText}>{error}</Text>}

                <ButtonCard style={styles.buttonCard}>
                    <Button style={styles.button('signin')} onPress={() => handleSignIn()}>
                        <ButtonText style={styles.buttonText('signin')}>Entrar</ButtonText>
                    </Button>

                    <Button style={styles.button()} onPress={() => handleSignUp()}>
                        <ButtonText style={styles.buttonText()}>Inscreva-se</ButtonText>
                    </Button>
                </ButtonCard>

            </Card>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        flex: 1,
    },
    loginText: {
        fontSize: 40,
        color: '#78d600',
        marginTop: 0,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    textInput: {
        borderColor: '#78d600',
        borderWidth: 3,
        backgroundColor: 'rgba(255,255,255,0.93)'
    },
    labelText: {
        color: '#78d600',
        textShadowColor: 'black',
        textShadowOffset: { width: -2, height: 2 }, // Deslocamento da sombra
        textShadowRadius: 4,
    },
    buttonCard: {
        marginTop: 150,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    button: (type) => {
        return {
            backgroundColor: type === 'signin' ? 'rgba(255,255,255,0.93)' : '#78d600',
            borderColor: '#78d600',
            borderWidth: 3,
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