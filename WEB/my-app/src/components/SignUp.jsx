import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

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
        
        const passwordValidated = validatePassword()
        
        // Tratativa de confirmação de senha
        if (!passwordValidated.valid) {
            defineMessage({
                message: 'Senha inválida. Preencha os requisitos',
                error: true,
                password: false,
            }, setMessageRequest)
            return
        }

        setMessageRequest({ message: 'Carregando...' });

        // Simulando a requisição para evitar erro
        try {

            await api.post(`/users/login`, { name ,email, passwordValidated })
           .then(async res => {
               defineMessage({ msg: `Cadastro realizado com sucesso` }, setMessageRequest, 1500);
      
               // Adiciona dados do usuário a sessão
               navigation.navigate('SignIn', res);
               setName('');
               setEmail('');
               setPassword('');
      
           })
         } catch (error) {
           console.log(error);
         }

            // Não há navegação no React, precisa ser tratado de outra forma, routers elinks
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
        Acompanhe o crescimento do seu jardim!
        <span style={{ fontSize: 18, color: '#78d600', }}>Cadastre-se</span> e monitore o crescimento das suas plantinhas.
        </p>
        
        <input
        className={messageRequest?.name && messageUserInput(messageRequest?.error)}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
        />
        
        <input
        className={messageRequest?.email && messageUserInput(messageRequest?.error)}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        />
        
        <input
        className={messageRequest?.password && messageUserInput(messageRequest?.error)}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        type="password"
        />
        
        <input
        className={messageRequest?.confirmedPassword && messageUserInput(messageRequest?.error)}
        value={confirmedPassword}
        onChange={(e) => setConfirmedPassword(e.target.value)}
        placeholder="Confirme sua Senha"
        type="password"
        />
        
        <p style={messageRequest?.error ? styles.errorText : styles.loadingRequestText}>{messageRequest?.message || ''}</p>
        
        <div style={styles.buttonCard}>
        <button style={styles.button} onClick={handleSignUp}>
        Cadastre-se
        </button>
        </div>
        </div>
    )
}

const styles = {
    container: {
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
        padding: 20,
        backgroundColor: '#fff',
        textAlign: 'center',
    },
    registerText: {
        fontSize: 16,
        color: '#000',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        margin: '10px 0',
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
