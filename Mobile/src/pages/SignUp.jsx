import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, ButtonCard, Button, ButtonText } from '../Styles';
import { StyleSheet, Appearance, TextInput, Text } from 'react-native';

const api = require('../utils/api')
const { screenWidth, screenHeight } = require('../utils/dimensions');
const colorTextInput = Appearance.getColorScheme() === 'dark' ? '#000' : '#000'

const SignUp = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const [messageRequest, setMessageRequest] = useState(null);


    // Seta mensagem de exibição ao usuário
    const defineMessage = (message, set, time = 2500) => {
        set(message)
        setTimeout(() => set(''), time)
        console.log(JSON.stringify(message))
    }


    // Realiza o Cadastro do usuário e redireciona a tela de Login
    const handleSignUp = async () => {
        // Validação de campos preenchidos
        if (name === '' || email === '' || password === '') {
            defineMessage({
                message: 'Preencha os campos corretamente',
                error: true,
                name: !name,
                email: !email,
                password: !password
            }, setMessageRequest)
            return
        }


        // Tratativa de confirmação de senha
        const passwordValidated = validatePassword()
        if (!passwordValidated.valid) {
            defineMessage({
                message: passwordValidated.message,
                error: true,
                password: false,
            }, setMessageRequest)
            return
        }

        setMessageRequest({ message: 'Carregando...' })

        await api.post('/users', { name, email, password })
            .then(res => {
                defineMessage({ message: res.message, error: false }, setMessageRequest, 4000) // Exibe mensage de sucesso

                // Redirecionamento tela de Login
                setTimeout(() => navigation.navigate('SignIn'), 1500)
            })
            .catch(err => {
                defineMessage({ message: err?.response?.data?.message || 'Erro ao cadastrar usuário', error: true, email: !err.email }, setMessageRequest)
            })
    }


    // Validação de Senha (confirma senha digitada pelo usuário)
    const validatePassword = () => {
        let result = {
            valid: false
        }

        if (password !== confirmedPassword) {
            defineMessage({
                message: 'As senhas não coincidem',
                error: true,
                password: false,
                confirmedPassword: false
            }, setMessageRequest)
            result.message = 'As senhas não coincidem'

        } else {
            defineMessage(null, setMessageRequest)
            result.valid = true
        }

        return result
    }


    // Verificação de requisitos de senha e senhas compatíveis
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
                style={[styles.input, messageRequest?.name && styles.messageUserInput(messageRequest?.error)]}
                value={name}
                onChangeText={setName}
                placeholder="Nome"
                placeholderTextColor={colorTextInput}
            />

            <TextInput
                style={[styles.input, messageRequest?.email && styles.messageUserInput(messageRequest?.error)]}
                value={email}
                onChangeText={setEmail}
                placeholder="E-mail"
                placeholderTextColor={colorTextInput}
            />

            <TextInput
                style={[styles.input, messageRequest?.password && styles.messageUserInput(messageRequest?.error)]}
                value={password}
                onChangeText={setPassword}
                placeholder="Senha"
                secureTextEntry={true}
                placeholderTextColor={colorTextInput}
            />

            <TextInput
                style={[styles.input, messageRequest?.confirmedPassword && styles.messageUserInput(messageRequest?.error)]}
                value={confirmedPassword}
                onChangeText={setConfirmedPassword}
                placeholder="Confirme sua Senha"
                secureTextEntry={true}
                placeholderTextColor={colorTextInput}
            />

            <Text style={messageRequest?.error ? styles.errorText : styles.loadingRequestText}>{messageRequest?.message || ''}</Text>

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
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    loadingRequestText: {
        fontSize: 16,
        color: '#78d600',
        marginBottom: 10,
        fontWeight: 'bold',
    },
});

export default SignUp;
