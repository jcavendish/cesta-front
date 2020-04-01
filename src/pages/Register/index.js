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

  const form = {
    handleSubmit: (e) => handleSubmit(e),
    inputs: [
      {
        placeholder: 'Nome de usuário',
        value: username,
        handleChange: (value) => setUsername(value),
      },
      {
        type: 'password',
        placeholder: 'Senha',
        value: password,
        handleChange: (value) => setPassword(value),
      },
      {
        type: 'email',
        placeholder: 'E-mail',
        value: email,
        handleChange: (value) => setEmail(value),
      },
      {
        placeholder: 'Whatsapp',
        value: whatsapp,
        handleChange: (value) => setWhatsapp(value),
      },
      {
        placeholder: 'Cidade',
        value: city,
        handleChange: (value) => setCity(value),
      },
      {
        placeholder: 'Uf',
        value: uf,
        handleChange: (value) => setUf(value),
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
          title="Cadastro"
          text="Faça seu cadastro, entre na plataforma e ajude pessoas a
          encontrarem os seus produtos."
        >
          <BackLink to="/">
            <FiArrowDownLeft size={16} color="#252a37" /> Já tenho cadastro
          </BackLink>
        </LogoContent>
        <Form {...form} />
      </ContentContainer>
    </DefaultContainer>
  );
};
