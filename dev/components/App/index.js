import React from 'react';
import axios from 'axios';
import { HashRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Joke from '../Joke';
import NetworkError from '../NetworkError';
import Loader from '../Loader';
import styles from './app.css';
import loading from '../../static/img/loading.gif';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: null,
    }
  }

  componentWillMount() {
    this.getData();
  }

  getData() {

    axios('https://api.chucknorris.io/jokes/categories')
      .then((response) => {
        this.setState({
          data: response.data,
        });
      })
      .catch(console.error);
  }

  render() {
    const { data } = this.state;
    return (
      <Router>
        <nav className={styles.app}>
          <ul className={styles.menu}>
            <li className={styles.menu__item}><NavLink className={styles.menu__itemLink} to="/">HOME</NavLink></li>
            {
              data ? (
                data.map((item, i) => (
                  <li className={styles.menu__item} key={i}><NavLink className={styles.menu__itemLink} to={`/category/${item}/`} >{item}</NavLink></li>
                ))
              ) : (
                  <li className={styles.menu__item} ><img className={styles.loader} src={loading} alt="Loading" /></li>
                )
            }
          </ul>
          <Switch>
            <Route exact path="/" component={Joke} />

            {
              data ? (
                data.map((item, i) => (
                  <Route path={`/category/:jokeId/`} exact component={Joke} key={i} />
                ))
              ) : (
                  <Route component={Loader} />
                )
            }
            <Route path="*" component={NetworkError} />
          </Switch>
        </nav>
      </Router>
    )
  }
}

export default App;


// data ? (
//     data.map((item, i) => (
//         <Route path={`/category/:jokeId`} exact component={Joke} key={i} />
//     ))
// ) : (
//         <p>loading</p>
//     )