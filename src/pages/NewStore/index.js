import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Register from '../../components/Register';

export default () => {
  const [name, setName] = useState('');

  const history = useHistory();

  const token = localStorage.getItem('token');
  if (!token) {
    history.push('/');
  }

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

  const form = {
    handleSubmit: (e) => handleSubmit(e),
    inputs: [
      {
        placeholder: 'Nova loja',
        value: name,
        handleChange: (value) => setName(value),
      },
    ],
    button: {
      action: {
        text: 'Cadastrar',
      },
    },
  };

  return (
    <Register
      title="Cadastrar nova loja"
      text="Crie sua loja, adicione produtos e comece a receber pedidos."
      linkTo="/lojas"
      linkText="Voltar para lojas"
      form={form}
    />
  );
};
