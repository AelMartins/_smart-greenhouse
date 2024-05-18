const api = require('../utils/api')
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
const { screenWidth, screenHeight } = require('../utils/dimensions');
import { Container, ButtonCard, Button, ButtonText } from '../Styles';
import { StyleSheet, Appearance, TextInput, Text } from 'react-native';

const colorTextInput = Appearance.getColorScheme() === 'dark' ? '#000' : '#000'

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messageUser, setMessageUser] = useState({});
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const navigation = useNavigation()


    // Seta mensagem de exibição ao usuário
    const setMessageWithTimeout = (object, timeout = 5000) => {
        setMessageUser(object)
        setTimeout(() => { setMessageUser({}) }, timeout)
    }


    // Realiza o Cadastro do usuário e redireciona a tela de Login
    const handleSignUp = async () => {
        // Validação de campos preenchidos
        if (name === '' || email === '' || password === '') {
            setMessageWithTimeout({
                message: 'Preencha os campos corretamente',
                error: true,
                name: !name,
                email: !email,
                password: !password
            })
            return
        }

        // Tratativa de confirmação de senha
        if (password !== confirmedPassword) {
            setMessageWithTimeout({
                message: 'As senhas não coincidem',
                error: true,
                password: false,
                confirmedPassword: false
            })
            return
        }


        await api.post('/users', { name, email, password })
            .then(res => {
                setMessageWithTimeout({ message: res.message, error: false }) // Exibe mensage de sucesso

                setTimeout(() => {
                    navigation.navigate('SignIn') // Redirecionamento tela de Login
                }, 1500)
            })
            .catch(err => {
                console.error('Erro no cadastro de usuário', err)
                setMessageWithTimeout({ message: err.message, error: true, email: !err.email })
            })
    }


    // Validação de Senha (confirma senha digitada pelo usuário)
    const validatePassword = () => {
        if (password !== confirmedPassword) {
            setMessageWithTimeout({
                message: 'As senhas não coincidem',
                error: true,
                password: false,
                confirmedPassword: false
            })
        } else {
            setMessageWithTimeout({})
        }
    }


    // Verificação de senha e confirmação
    useEffect(() => {
        if (confirmedPassword !== '') {
            const timer = setTimeout(validatePassword, 500)
            return () => clearTimeout(timer)
        }

    }, [confirmedPassword])


    return (
        <Container style={styles.container}>
            <Text style={styles.registerText}>
                Acompanhe o crescimento do seu jardim!
                <Text style={{ fontSize: 18, color: '#78d600', }}>Cadastre-se</Text> e monitore o crescimento das suas plantinhas.
            </Text>

            <TextInput
                style={[styles.input, messageUser.name && styles.messageUserInput(messageUser.error)]}
                value={name}
                onChangeText={setName}
                placeholder="Nome"
                placeholderTextColor={colorTextInput}
            />

            <TextInput
                style={[styles.input, messageUser.email && styles.messageUserInput(messageUser.error)]}
                value={email}
                onChangeText={setEmail}
                placeholder="E-mail"
                placeholderTextColor={colorTextInput}
            />

            <TextInput
                style={[styles.input, messageUser.password && styles.messageUserInput(messageUser.error)]}
                value={password}
                onChangeText={setPassword}
                placeholder="Senha"
                secureTextEntry={true}
                placeholderTextColor={colorTextInput}
            />

            <TextInput
                style={[styles.input, messageUser.confirmedPassword && styles.messageUserInput(messageUser.error)]}
                value={confirmedPassword}
                onChangeText={setConfirmedPassword}
                placeholder="Confirme sua Senha"
                secureTextEntry={true}
                placeholderTextColor={colorTextInput}
            />

            <Text style={styles.messageUserText(messageUser.error)}>{messageUser.message ? messageUser.message : ''}</Text>

            <ButtonCard style={styles.buttonCard}>
                <Button style={styles.button} onPress={() => handleSignUp()}>
                    <ButtonText style={styles.buttonText}>Cadastre-se</ButtonText>
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
        fontSize: 16,
        color: '#000',
        marginBottom: 80,
        width: screenWidth * 0.8,
    },
    input: {
        margin: 10,
        fontSize: 17,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: '#78d600',
        color: colorTextInput,
        width: screenWidth * 0.8,
        height: screenHeight * 0.05,
        backgroundColor: 'rgba(45,159,49,0.1)',
    },
    buttonCard: {
        marginTop: 80,
    },
    button: {
        borderWidth: 3,
        borderColor: '#78d600',
        backgroundColor: '#78d600',
    },
    buttonText: {
        color: '#fff'
    },
    messageUserInput: (type) => {
        return type ? { borderColor: 'red', } : {}
    },
    messageUserText: (type) => {
        return {
            marginBottom: 10,
            color: type ? 'red' : '#78d600',
        }

    },
});

export default SignUp;