import React from 'react';
import { FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';

import logoImg from '../assets/logo.svg';
import { LogoutButton } from './Buttons';
import styled from 'styled-components';

export default function Header(props) {
  const history = useHistory();

  let username;
  const token = localStorage.getItem('token');
  if (!token) {
    history.push('/');
  } else {
    username = jwt_decode(token).username;
  }

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <Container>
      <ContainerHeader>
        <SideContainer>
          <img src={logoImg} alt="be the hero" style={{ height: 84 }} />
          <HeaderSpan>
            Bem vindo(a), <strong>{username}</strong>
          </HeaderSpan>
        </SideContainer>
        <SideContainer>
          {props.button}
          <LogoutButton OnClick={(e) => handleClick()}>
            <FiPower color="#f3d43f" size={18} />
          </LogoutButton>
        </SideContainer>
      </ContainerHeader>
    </Container>
  );
}

Header.propTypes = {
  button: PropTypes.element,
};

const HeaderSpan = styled.span`
  font-size: 20px;
  margin-left: 24px;
  color: #ffffff;
  margin-left: 50px;
`;

const SideContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ContainerHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  justify-items: center;
`;

const Container = styled.div`
  position: absolute;
  padding: 10px 50px;
  width: 100%;
  left: 0;
  top: 0;
  background-color: #252a37;
`;
