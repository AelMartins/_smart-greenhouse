import React from 'react';
import { Container } from '../Styles';
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';


const SignIn = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigation = useNavigation();

    const handleSignIn = () => {
        navigation.navigate('Home');
    };

    const handleSignUp = () => {
        navigation.navigate('SignUp');
    };

    return (
        <View style={styles.view}>
            <Container style={styles.container}>
                <Text style={styles.loginText}>Login</Text>

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your e-mail"
                />

                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                />

                <TouchableOpacity onPress={() => handleSignIn()} style={styles.button}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleSignUp()} style={styles.button}>
                    <Text style={styles.buttonText}>Inscreva-se</Text>
                </TouchableOpacity>
            </Container>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 200
    },
    loginText: {
        fontSize: 40,
        color: '#1a6eff',
        marginTop: 0,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#070099',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    subSignInText: {
        fontSize: 16,
        color: '#000000',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#1a6eff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default SignIn;