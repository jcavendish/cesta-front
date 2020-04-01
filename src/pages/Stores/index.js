import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiTrash2, FiArrowRight } from 'react-icons/fi';

import './style.css';

import api from '../../services/api';
import Header from '../Header';

export default function Stores() {
  const [stores, setStores] = useState([]);

  const token = localStorage.getItem('token');

  const history = useHistory();

  useEffect(() => {
    const getStores = async () => {
      try {
        const response = await api.get('stores', {
          headers: {
            Authorization: token,
          },
        });

        setStores(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStores();
  }, [token]);

  const handleSelect = (store) => {
    history.push('/loja/detalhe', [store]);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`stores/${id}`, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.log(error);
    }
    setStores(stores.filter((store) => store.id !== id));
  };

  return (
    <div className="profile-container">
      <Header
        button={
          <Link className="button" to="/loja/cadastrar">
            Cadastrar nova loja
          </Link>
        }
      />
      <section className="content-container">
        <h2>Lojas cadastradas</h2>
        <ul>
          {stores.map((store) => (
            <li key={store.id}>
              <div className="content-fields">
                <strong>NAME:</strong>
                <p>{store.name}</p>

                <strong>RATE:</strong>
                <p>{store.rate}</p>
              </div>
              <div className="content-buttons">
                <button
                  className="icon-button"
                  onClick={() => handleDelete(store.id)}
                  type="button"
                >
                  <FiTrash2 size={20} color="a8a8b3" />
                </button>
                <button
                  className="icon-button"
                  onClick={() => handleSelect(store)}
                  type="button"
                >
                  <FiArrowRight size={20} color="a8a8b3" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
