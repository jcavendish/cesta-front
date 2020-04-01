import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function DefaultBackLink({ className, to, children }) {
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

export default styled(DefaultBackLink)`
  display: flex;
  align-items: center;
  margin-top: 40px;
  color: #41414d;
  font-size: 18px;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 02s;

  svg {
    margin-right: 8px;
  }

  & :hover {
    opacity: 0.8;
  }
`;
