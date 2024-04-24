import React from 'react';
import { Container, Card, ButtonCard, Button, ButtonText, TextInput } from '../Styles';
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';


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
        <Container>
            <Card>

                <Text style={styles.loginText}>Login</Text>

                <TextInput
                    value={email}
                    style={styles.input}
                    onChangeText={setEmail}
                    placeholder="Digite seu e-mail"
                />

                <TextInput
                    value={password}
                    style={styles.input}
                    onChangeText={setPassword}
                    placeholder="Senha"
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

        </Container>
    )
}

const styles = StyleSheet.create({
    loginText: {
        fontSize: 40,
        color: '#33d100',
        marginTop: 0,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        borderColor: '#33d100',
        borderWidth: 2,
    },
    buttonCard: {
        marginTop: 150,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    button: (type) => {
        return {
            backgroundColor: type === 'signin' ? '#fff' : '#33d100',
            borderColor: type === 'signin' ? '#33d100' : undefined,
            borderWidth: type === 'signin' ? 2 : undefined,
            width: type === 'signin' ? 100 : 150,
        }
    },
    buttonText: (type) => {
        return {
            color: type === 'signin' ? '#33d100' : '#fff'
        }
    },
});

export default SignIn;