import React from 'react';
import PropTypes from 'prop-types';
import logoImg from '../assets/logo.png';
import styled from 'styled-components';

export default function LogoContent(props) {
  return (
    <Content>
      <Image src={logoImg} alt="cesta" />
      <LogoContentSection>
        <LogoContentTitle>{props.title}</LogoContentTitle>
        <LogoContentParagraph>{props.text}</LogoContentParagraph>

        {props.children}
      </LogoContentSection>
    </Content>
  );
}

const LogoContentParagraph = styled.p`
  font-size: 18px;
  color: #737380;
  line-height: 32px;
`;

const LogoContentTitle = styled.h2`
  margin: 64px 0 32px;
  font-size: 32px;
`;

const LogoContentSection = styled.section`
  width: 100%;
  max-width: 380px;
`;

const Image = styled.img`
  width: 40%;
  align-self: center;
`;

const Content = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

LogoContent.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
