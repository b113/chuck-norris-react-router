import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import NetworkError from '../NetworkError';
import styles from './joke.css';


class Joke extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      error: '',
    };
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { match: { params: { jokeId } } } = this.props;
    const { jokeId: jokePrev } = prevProps.match.params;
    const { data } = this.state;
    if (jokePrev !== jokeId) {
      axios(`https://api.chucknorris.io/jokes/random?category=${jokeId}`)
        .then((response) => {
          this.setState({
            data: response.data,
          });
        })
        .catch((error) => {
          this.setState({
            error: error.message,
            data: null,
          });
        });
    }

    if (data !== null && prevState.data === data) {
      this.clearData();
    }
  }

  getData() {
    const { match: { params: { jokeId } } } = this.props;
    const { match: { params } } = this.props;
    if (JSON.stringify(params) === '{}') {
      axios('https://api.chucknorris.io/jokes/random')
        .then((response) => {
          this.setState({
            data: response.data,
          });
        })
        .catch((error) => {
          this.setState({
            error: error.message,
            data: null,
          });
        });
    } else {
      axios(`https://api.chucknorris.io/jokes/random?category=${jokeId}`)
        .then((response) => {
          this.setState({
            data: response.data,
          });
        })
        .catch((error) => {
          this.setState({
            error: error.message,
            data: null,
          });
        });
    }
  }

  clearData() {
    this.setState({ data: null });
  }

  render() {
    const { data, error } = this.state;
    return (
      <div className={styles.joke}>
        {
          data ? (
            <div className={styles.joke__item}>
              <div className={styles.joke__itemWrapper}>
                <p className={styles.joke__text}>{data.value}</p>
                <p className={styles.joke__category}>
                  Category:&nbsp;
                  {
                    data.category === null ? (
                      'dunno'
                    ) : (
                      data.category[0]
                    )
                  }
                </p>
              </div>
            </div>
          ) : (
            <NetworkError error={error} />
          )
        }
      </div>
    );
  }
}

Joke.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      jokeId: PropTypes.string,
    }),
  }).isRequired,
};

export default Joke;
