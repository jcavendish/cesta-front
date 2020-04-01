import React from 'react';
import propTypes from 'prop-types';
import { FiStar } from 'react-icons/fi';

export default function Rate(props) {
  function getStarsFrom(number) {
    const arr = [];
    let rate = props.rate;
    for (let i = 0; i < number; i++) {
      if (rate > 0) {
        arr.push(
          <FiStar
            key={i}
            style={{ fill: '#f3d43f' }}
            color="#f3d43f"
            size={20}
          ></FiStar>
        );
        rate--;
      } else {
        arr.push(<FiStar key={i} color="#f3d43f" size={20}></FiStar>);
      }
    }
    return arr;
  }

  return <div>{getStarsFrom(props.size).map((element) => element)}</div>;
}

Rate.defaultProps = {
  size: 5,
};

Rate.propTypes = {
  size: propTypes.number.isRequired,
  rate: propTypes.number.isRequired,
};
