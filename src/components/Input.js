import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import hashCode from '../utils/hashCode';

function Input({ className, type, placeholder, value, OnChange, icon }) {
  return (
    <InputWrapper>
      {icon ? icon : null}
      <input
        key={hashCode(placeholder)}
        type={type}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={(e) => OnChange(e.target.value)}
      />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 480px;
`;

export const DefaultInput = styled(Input)`
  width: 100%;
  height: 60px;
  color: #333333;
  border: 1px solid #dcdce6;
  border-radius: 8px;
  padding: 0 24px;
  margin-top: 8px;
`;

Input.defaultProps = {
  type: 'text',
};

Input.propTypes = {
  className: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  OnChange: PropTypes.func.isRequired,
};
