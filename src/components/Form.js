import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PrimaryButton } from './Buttons';
import hashCode from '../utils/hashCode';

export default function Form(props) {
  return (
    <FormContainer>
      <DefaultForm onSubmit={(e) => props.handleSubmit(e)}>
        {props.title ? <Title>{props.title}</Title> : null}
        {props.inputs.map((input) => (
          <DefaultInput
            {...input}
            OnChange={(value) => input.handleChange(value)}
          />
        ))}

        <PrimaryButton type="submit">{props.button.action.text}</PrimaryButton>

        {props.children}
      </DefaultForm>
    </FormContainer>
  );
}

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 32px;
`;

const DefaultForm = styled.form`
  width: 100%;
  max-width: 450px;
`;

const FormContainer = styled.section`
  width: 100%;
  max-width: 380px;
`;

function Input({ className, type, placeholder, value, OnChange }) {
  return (
    <input
      key={hashCode(placeholder)}
      type={type}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={(e) => OnChange(e.target.value)}
    />
  );
}

const DefaultInput = styled(Input)`
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

Form.propTypes = {
  handleSubmit: PropTypes.func,
  title: PropTypes.string,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      placeholder: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      handleChange: PropTypes.func.isRequired,
    }).isRequired
  ).isRequired,
  button: PropTypes.shape({
    action: PropTypes.shape({
      text: PropTypes.string.isRequired,
      handleClick: PropTypes.func,
    }).isRequired,
    second: PropTypes.shape({
      text: PropTypes.string.isRequired,
      handleClick: PropTypes.func,
    }),
  }).isRequired,
};
