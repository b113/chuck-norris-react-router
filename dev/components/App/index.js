import React from 'react';
import axios from 'axios';
import {
  HashRouter as Router, Route, Switch, NavLink,
} from 'react-router-dom';
import Joke from '../Joke';
import NetworkError from '../NetworkError';
import Loader from '../Loader';
import styles from './app.css';
import loading from '../../static/img/loading.gif';

let id = 0;
const uniqueId = () => {
  id += 1;
  return id;
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: null,
    };
    this.arrRoute = this.arrRoute.bind(this);
    this.arrNavlink = this.arrNavlink.bind(this);
  }

  componentDidMount() {
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

  arrRoute() {
    const arr = [];
    const { data } = this.state;
    arr.push(<Route key={uniqueId()} exact path="/" component={Joke} />);
    data.map(() => (
      arr.push(<Route path="/category/:jokeId/" exact component={Joke} key={uniqueId()} />)
    ));
    return arr;
  }

  arrNavlink() {
    const arr = [];
    const { data } = this.state;
    arr.push(<li key={uniqueId()} className={styles.menu__item}><NavLink exact className={styles.menu__itemLink} to="/">HOME</NavLink></li>);
    data.map(item => (
      arr.push(<li className={styles.menu__item} key={uniqueId()}><NavLink className={styles.menu__itemLink} to={`/category/${item}/`}>{item}</NavLink></li>)
    ));
    return arr;
  }

  render() {
    const { data } = this.state;
    return (
      <Router>
        <nav className={styles.app}>
          <ul className={styles.menu}>
            {
              data ? (
                this.arrNavlink().map(item => item)
              ) : (
                <img className={styles.loader} src={loading} alt="Loading" />
              )
            }
          </ul>
          <Switch>
            {
              data ? (
                this.arrRoute().map(item => item)
              ) : (
                <Route component={Loader} />
              )
            }
            <Route path="*" render={() => <NetworkError error="Network Error" />} />
          </Switch>
        </nav>
      </Router>
    );
  }
}

export default App;
