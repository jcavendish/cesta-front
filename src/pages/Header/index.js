import React from 'react';
import logoImg from '../../assets/logo.svg';
import { FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import './style.css';

export default function Header(props) {
  const history = useHistory();

  const token = localStorage.getItem('token');
  const user = jwt_decode(token);

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="header-container">
      <header>
        <div className="header-left-container">
          <img src={logoImg} alt="be the hero" />
          <span>
            Bem vindo(a), <strong>{user.username}</strong>
          </span>
        </div>
        <div className="header-right-container">
          {props.button}
          <button type="button" onClick={handleClick}>
            <FiPower color="#f3d43f" size={18} />
          </button>
        </div>
      </header>
    </div>
  );
}
