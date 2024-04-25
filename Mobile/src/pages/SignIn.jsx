import React from 'react';
import { Card, ButtonCard, Button, ButtonText, TextInput, LabelText } from '../Styles';
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, ImageBackground, Text } from 'react-native';
import { BlurView } from '@react-native-community/blur'


const SignIn = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigation = useNavigation();

    const handleSignIn = () => {
        if (email === '' && password === '') {
            navigation.navigate('Home');

        } else {
            alert('E-mail e/ou senha incorretos!')
        }
    };

    const handleSignUp = () => {
        navigation.navigate('SignUp');
    };

    return (
        <ImageBackground
            source={require('../images/background.jpg')} // Substitua pelo caminho da sua imagem
            style={styles.background}
        >
            <BlurView
                style={styles.blur}
                blurType="light" // "dark" | "light" | "xlight")
                blurAmount={3} // Define o valor do desfoque (valor padrão é 10)
            >
                <Card>
                    <LabelText style={styles.labelText}>E-mail</LabelText>
                    <TextInput
                        value={email}
                        style={styles.textInput}
                        onChangeText={setEmail}
                        placeholder="Digite seu e-mail"
                    />

                    <LabelText style={styles.labelText}>Senha</LabelText>
                    <TextInput
                        value={password}
                        style={styles.textInput}
                        onChangeText={setPassword}
                        placeholder="Senha"
                        secureTextEntry={true}
                    />


                    <ButtonCard style={styles.buttonCard}>
                        <Button style={styles.button('signin')} onPress={() => handleSignIn()}>
                            <ButtonText style={styles.buttonText('signin')}>Entrar</ButtonText>
                        </Button>

                        <Button style={styles.button()} onPress={() => handleSignUp()}>
                            <ButtonText style={styles.buttonText()}>Inscreva-se</ButtonText>
                        </Button>
                    </ButtonCard>

                </Card>
            </BlurView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    blur: {
        flex: 1,
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 40,
        color: '#39eb00',
        marginTop: 0,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    textInput: {
        borderColor: '#39eb00',
        borderWidth: 3,
        backgroundColor: 'rgba(255,255,255,0.93)'
    },
    labelText: {
        color: '#49ff0f',
        textShadowColor: 'black',
        textShadowOffset: { width: -2, height: 2 }, // Deslocamento da sombra
        textShadowRadius: 8,
    },
    buttonCard: {
        marginTop: 150,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    button: (type) => {
        return {
            backgroundColor: type === 'signin' ? 'rgba(255,255,255,0.93)' : '#39eb00',
            borderColor: '#39eb00',
            borderWidth: 3,
        }
    },
    buttonText: (type) => {
        return {
            color: type === 'signin' ? '#39eb00' : '#fff'
        }
    },
});

export default SignIn;