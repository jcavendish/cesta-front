import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowDownLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import './style.css';

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('users', {
        username,
        password,
        email,
        whatsapp,
        city,
        uf,
      });
      history.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <div className="content">
        <div className="logo-content">
          <img src={logoImg} alt="cesta" />
          <section>
            <h2>Cadastro</h2>
            <p>
              Faça seu cadastro, entre na plataforma e ajude pessoas a
              encontrarem os casos de sua ONG.
            </p>

            <Link className="back-link" to="/">
              <FiArrowDownLeft size={16} color="#252a37" /> Já tenho cadastro
            </Link>
          </section>
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="Uf"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              style={{ width: 80 }}
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};
