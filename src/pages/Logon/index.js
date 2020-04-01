import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi/';
import { useHistory } from 'react-router-dom';

import './style.css';

import logoImg from '../../assets/logo.png';
import api from '../../services/api';
import Form from '../../components/Form';
import BackLink from '../../components/BackLink';

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('sessions', { username, password });
      localStorage.setItem('token', response.data.token);

      if (response.data.auth) {
        history.push('/lojas');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const form = {
    handleSubmit: (e) => handleLogin(e),
    title: 'Faça seu login',
    inputs: [
      {
        placeholder: 'Seu nome de usuário',
        value: username,
        handleChange: (value) => setUsername(value),
      },
      {
        type: 'password',
        placeholder: 'Sua senha',
        value: password,
        handleChange: (value) => setPassword(value),
      },
    ],
    button: {
      action: {
        text: 'Entrar',
      },
    },
  };

  return (
    <div className="logon-container">
      <div className="left-container">
        <Form {...form}>
          <BackLink to="/registrar">
            <FiLogIn size={16} color="#252a37" /> Não tenho cadastro
          </BackLink>
        </Form>
      </div>
      <div className="right-container">
        <img src={logoImg} alt="cesta" width={'50%'} />
      </div>
    </div>
  );
};
