import React from 'react';
import { DefaultWrapper, ContentWrapper } from './Wrappers';
import LogoContent from './LogoContent';
import BackLink from './BackLink';
import { FiArrowDownLeft } from 'react-icons/fi';
import Form from './Form';

export default function Register({ title, text, linkTo, linkText, children }) {
  return (
    <DefaultWrapper>
      <ContentWrapper>
        <LogoContent title={title} text={text}>
          <BackLink to={linkTo}>
            <FiArrowDownLeft size={16} color="#252a37" />
            {linkText}
          </BackLink>
        </LogoContent>
        <Form {...children} />
      </ContentWrapper>
    </DefaultWrapper>
  );
}
