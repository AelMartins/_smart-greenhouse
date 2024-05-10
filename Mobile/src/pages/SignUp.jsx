import React from 'react';
import { Container } from '../Styles';
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';


const SignUp = () => {
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [cpf, setCpf] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [course, setCourse] = React.useState('');

    const navigation = useNavigation()

    const handleSignIn = () => {
        navigation.navigate('SignIn')
    }


    return (
        <View style={styles.view}>
            <Container style={styles.container}>
                <Text style={styles.registerText}>Cadastro</Text>

                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Nome"
                />

                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Telefone"
                />

                <TextInput
                    style={styles.input}
                    value={cpf}
                    onChangeText={setCpf}
                    placeholder="CPF"
                />

                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="E-mail"
                />

                <TextInput
                    style={styles.input}
                    value={course}
                    onChangeText={setCourse}
                    placeholder="Curso"
                />

                <TouchableOpacity onPress={() => handleSignIn()} style={styles.button}>
                    <Text style={styles.buttonText}>Inscrever-se</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleSignIn()} style={styles.button_back}>
                    <Text style={styles.buttonText_back}>Voltar</Text>
                </TouchableOpacity>
            </Container>
        </View>
    )
}

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
    registerText: {
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
    button: {
        backgroundColor: '#1a6eff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    button_back: {
        margin: 10,
        borderWidth: 3,
        borderColor: '#1a6eff',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    buttonText_back: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a6eff',
    },
});

export default SignUp;