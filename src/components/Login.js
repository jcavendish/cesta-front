import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import styled from 'styled-components';

import Form from './Form';
import BackLink from './BackLink';
import { LoginWrapper } from './Wrappers';

import logoImg from '../assets/logo.png';

export default function Login({ children }) {
  return (
    <LoginWrapper>
      <LeftContainer>
        <Form {...children}>
          <BackLink to="/registrar">
            <FiLogIn size={16} color="#252a37" /> Não tenho cadastro
          </BackLink>
        </Form>
      </LeftContainer>
      <RightContainer>
        <img src={logoImg} alt="cesta" width={'50%'} />
      </RightContainer>
    </LoginWrapper>
  );
}

const LeftContainer = styled.div`
  width: 100%;
`;

const RightContainer = styled.div`
  width: 50%;
  height: 100vh;
  background-color: #252a37;
  right: 0;
  position: absolute;
  display: flex;

  & img {
    width: 60%;
    margin: auto;
  }
`;
