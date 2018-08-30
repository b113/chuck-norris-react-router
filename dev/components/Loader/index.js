import React from 'react';
import styles from './loader.css';
import loading from '../../static/img/loader.png';

const Loader = () => (
  <div className={styles.loader}>
    <img className={styles.loader__img} src={loading} alt="Loading" />
    <p className={styles.loader__text}>Just wait!</p>
  </div>
);

export default Loader;
