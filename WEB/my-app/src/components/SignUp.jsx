import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as api from '../utils/api';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [messageRequest, setMessageRequest] = useState(null);
    const navigate = useNavigate();
    
    const defineMessage = (message, set, time = 2500) => {
        set(message)
        setTimeout(() => set(''), time)
        console.log(JSON.stringify(message))
    }
    
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

        setMessageRequest({ message: 'Carregando...' });

        try {
            await api.post(`/users`, { name, email, password })
                .then(async res => {
                    defineMessage({ msg: `Cadastro realizado com sucesso` }, setMessageRequest, 1500);

                    navigate('/SignIn', res);
                    setName('');
                    setEmail('');
                    setPassword('');
                });
        } catch (error) {
            console.log(error);
        }
    }
    
    const validatePassword = () => {
        const result = { 
            valid: false,
            passwordsMatch: false,
            resume: {
                hasLowerCase: /[a-z]/.test(password),
                hasUpperCase: /[A-Z]/.test(password),
                hasNumber: /\d/.test(password),
                hasSpecialChar: /[@$!%*?&]/.test(password),
                hasMinLength: password.length >= 6,
            },
        }
        
        if (password !== confirmedPassword) {
            defineMessage({
                message: 'As senhas não coincidem',
                error: true,
                password: false,
                confirmedPassword: false
            }, setMessageRequest)
            
        } else {
            defineMessage(null, setMessageRequest)
            result.passwordsMatch = true
        }
        
        result.valid = Object.values(result.resume).every(value => value === true) && result.passwordsMatch === true
        console.log('result', result);
        return result
    }
    
    useEffect(() => {
        if (confirmedPassword !== '') {
            const timer = setTimeout(validatePassword, 500)
            return () => clearTimeout(timer)
        }
    }, [password, confirmedPassword])
    
    const messageUserInput = (type) => {
        return type ? 'error' : 'input';
    }
    
    return (
        <div style={styles.container}>
            <p style={styles.registerText}>
                Acompanhe o crescimento do seu jardim! <span style={{ fontSize: 18, color: '#78d600' }}>Cadastre-se</span> e monitore o crescimento das suas plantinhas.
            </p>
            
            <div style={styles.form}>
                <input
                    className={messageRequest?.name && messageUserInput(messageRequest?.error)}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome"
                    style={styles.input}
                />
                
                <input
                    className={messageRequest?.email && messageUserInput(messageRequest?.error)}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                    style={styles.input}
                />
                
                <input
                    className={messageRequest?.password && messageUserInput(messageRequest?.error)}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    type="password"
                    style={styles.input}
                />
                
                <input
                    className={messageRequest?.confirmedPassword && messageUserInput(messageRequest?.error)}
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    placeholder="Confirme sua Senha"
                    type="password"
                    style={styles.input}
                />
                
                <p style={messageRequest?.error ? styles.errorText : styles.loadingRequestText}>{messageRequest?.message || ''}</p>
                
                <div style={styles.buttonCard}>
                    <button style={styles.button} onClick={handleSignUp}>
                        Cadastre-se
                    </button>
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: 20,
        backgroundColor: '#fff',
        textAlign: 'center',
    },
    form: {
        width: '100%',
        maxWidth: 400,
    },
    registerText: {
        fontSize: 16,
        color: '#000',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: '0 10px',
        borderColor: '#78d600',
        color: '#000',
        backgroundColor: 'rgba(45,159,49,0.1)',
    },
    error: {
        borderColor: 'red',
    },
    buttonCard: {
        marginTop: 20,
    },
    button: {
        borderWidth: 3,
        borderColor: '#78d600',
        backgroundColor: '#78d600',
        padding: '10px 20px',
        borderRadius: 5,
        color: '#fff',
        cursor: 'pointer',
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
};

export default SignUp;
