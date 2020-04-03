import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Login from '../../components/Login';

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

  return (
    <Login>
      {{
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
      }}
    </Login>
  );
};
