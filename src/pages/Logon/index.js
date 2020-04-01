import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi/';
import { Link, useHistory } from 'react-router-dom';

import './style.css';

import logoImg from '../../assets/logo.png';
import api from '../../services/api';

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  (function checkLoggedInUser() {
    if (localStorage.getItem('token')) {
      history.push('/lojas');
    }
  })();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('sessions', { username, password });
      localStorage.setItem('token', response.data.token);
      console.log(response);
      if (response.data.auth) {
        history.push('/lojas');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="logon-container">
      <div className="left-container">
        <section className="form">
          <form onSubmit={(e) => handleLogin(e)}>
            <h2>Faça seu login</h2>

            <input
              placeholder="Seu nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" type="submit">
              Entrar
            </button>

            <Link className="back-link" to="/registrar">
              <FiLogIn size={16} color="#252a37" /> Não tenho cadastro
            </Link>
          </form>
        </section>
      </div>
      <div className="right-container">
        <img src={logoImg} alt="cesta" width={'50%'} />
      </div>
    </div>
  );
};
