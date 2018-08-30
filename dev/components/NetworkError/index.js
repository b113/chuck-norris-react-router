import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import styles from './networkerror.css';
import errorImg from '../../static/img/404.png';


const NetworkError = ({ error }) => {
  if (error === 'Network Error' || error === undefined) {
    return (
      <div className={styles.networkError}>
        <img className={styles.networkError__img} src={errorImg} alt="Loading" />
        <h2 className={styles.networkError__header}>Whoa, your're lost buddy!</h2>
        <p className={styles.networkError__text}>You don't find Chuck Norris, Chuck Norris finds you!</p>
      </div>
    )
  }
  return <Loader />;
};

// NetworkError.propTypes = {
//   error: PropTypes.string.isRequired,
// };

export default NetworkError;
