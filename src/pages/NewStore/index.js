import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowDownLeft } from 'react-icons/fi';

import api from '../../services/api';

import Form from '../../components/Form';
import LogoContent from '../../components/LogoContent';
import BackLink from '../../components/BackLink';
import {
  DefaultContainer,
  ContentContainer,
} from '../../components/DefaultContainers';

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
    <DefaultContainer>
      <ContentContainer>
        <LogoContent
          title="Cadastrar nova loja"
          text="Crie sua loja, adicione produtos e comece a receber pedidos."
        >
          <BackLink to="/lojas">
            <FiArrowDownLeft size={16} color="#252a37" /> Voltar para lojas
          </BackLink>
        </LogoContent>

        <Form {...form} />
      </ContentContainer>
    </DefaultContainer>
  );
};
