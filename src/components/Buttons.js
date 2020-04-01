import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Button({ className, type, OnClick, children }) {
  if (OnClick) {
    return (
      <button className={className} type={type} onClick={(e) => OnClick(e)}>
        {children}
      </button>
    );
  }
  return (
    <button className={className} type={type}>
      {children}
    </button>
  );
}

function LinkButton({ className, to, children }) {
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

const DefaultButton = styled(Button)`
  cursor: pointer;
`;

export const PrimaryLinkButton = styled(LinkButton)`
  height: 60%;
  background: #f3d43f;
  border: 0;
  border-radius: 8px;
  color: #252a37;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  line-height: 60px;
  transition: filter 0.2s;

  width: 260px;
  margin-left: auto;
  margin-top: 0;

  &:hover {
    filter: brightness(90%);
  }
`;

export const PrimaryButton = styled(DefaultButton)`
  width: 100%;
  height: 60%;
  background: #f3d43f;
  border: 0;
  border-radius: 8px;
  color: #252a37;
  font-weight: 700;
  margin-top: 16px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  line-height: 60px;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(90%);
  }
`;

export const IconButton = styled(DefaultButton)`
  border: 0;
  background: transparent;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const LogoutButton = styled(DefaultButton)`
  height: 60px;
  width: 60px;
  border-radius: 4px;
  border: 1px solid #f3d43f;
  background: transparent;
  margin-left: 16px;
  transition: border-color 0.2s;

  &:hover {
    border-color: #999;
  }
`;

Button.defaultProps = {
  type: 'button',
};

Button.propTypes = {
  type: PropTypes.string,
  OnClick: PropTypes.func,
};
