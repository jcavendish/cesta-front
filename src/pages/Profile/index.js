import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FiTrash2, FiArrowRight } from 'react-icons/fi';

import './style.css';

import api from '../../services/api';
import Header from '../../components/Header';
import Rate from '../../components/Rate';
import { IconButton, PrimaryLinkButton } from '../../components/Buttons';

export default function Profile() {
  const history = useHistory();

  const token = localStorage.getItem('token');
  console.log(token);
  if (!token) {
    console.log('NO TOKEN');
    history.push('/');
  }

  const [stores, setStores] = useState([]);

  useEffect(() => {
    const getStores = async () => {
      try {
        const response = await api.get('profile', {
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

  function handleSelect(store) {
    history.push('/loja/detalhe', [store]);
  }

  async function handleDelete(id) {
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
  }

  return (
    <div className="profile-container">
      <Header
        button={
          <PrimaryLinkButton to="/loja/cadastrar">
            Cadastrar nova loja
          </PrimaryLinkButton>
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
                <Rate rate={store.rate}></Rate>
              </div>
              <div className="content-buttons">
                <IconButton OnClick={() => handleDelete(store.id)}>
                  <FiTrash2 size={20} color="a8a8b3" />
                </IconButton>
                <IconButton OnClick={() => handleSelect(store)}>
                  <FiArrowRight size={20} color="a8a8b3" />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
