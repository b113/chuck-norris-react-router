import React from 'react';
import axios from 'axios';
import NetworkError from '../NetworkError';
import styles from './joke.css';


class Joke extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            error: '',
        }
    }

    componentDidMount() {
        this.getData();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(this.props.match.params.jokeId)
    //     console.log(nextProps.match.params.jokeId)
    //     if (nextProps.match.params.jokeId !== this.props.match.params.jokeId) {
    //         axios(`https://api.chucknorris.io/jokes/random?category=${this.props.match.params.jokeId}`)
    //             .then((response) => {
    //                 this.setState({
    //                     data: response.data,
    //                 });
    //             })
    //             .catch(console.error);
    //     }
    //     return true;
    // }

    componentDidUpdate(prevProps, nextState) {
        if (prevProps.match.params.jokeId !== this.props.match.params.jokeId) {
            axios(`https://api.chucknorris.io/jokes/random?category=${this.props.match.params.jokeId}`)
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
        return true;
    }



    getData() {
        let { jokeId } = this.props.match.params;
        if (JSON.stringify(this.props.match.params) === '{}') {
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

    render() {
        const { data, error } = this.state;
        return (
            <div className={styles.joke}>
                {
                    data ? (
                        <div className={styles.joke__item}>
                            <div className={styles.joke__itemWrapper}>
                                <p className={styles.joke__text}>{data.value}</p>
                                <p className={styles.joke__category}>Category: {data.category === null ? 'dunno' : data.category[0]}</p>
                            </div>
                        </div>
                    ) : (
                            <NetworkError error={error} />
                        )
                }
            </div>
        )
    }
}

export default Joke;

