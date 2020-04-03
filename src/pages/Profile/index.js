import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Profile from '../../components/Profile';

export default function ProfileContainer() {
  const history = useHistory();

  const token = localStorage.getItem('token');

  if (!token) {
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
    <Profile
      stores={stores}
      actions={{
        delete: (id) => handleDelete(id),
        select: (store) => handleSelect(store),
      }}
    />
  );
}
