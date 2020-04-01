import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowDownLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import './styles.css';

export default () => {
  const [name, setName] = useState('');

  const history = useHistory();

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        'stores',
        { name },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      history.push('/lojas');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new-store-container">
      <div className="content">
        <div className="logo-content">
          <img src={logoImg} alt="cesta" />
          <section>
            <h2>Cadastrar nova loja</h2>
            <p>Crie sua loja, adicione produtos e comece a receber pedidos.</p>

            <Link className="back-link" to="/lojas">
              <FiArrowDownLeft size={16} color="#252a37" /> Voltar para lojas
            </Link>
          </section>
        </div>
        <div className="form-content">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              placeholder="Nova loja"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="button" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
