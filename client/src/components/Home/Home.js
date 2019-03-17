import React, { Component, Fragment } from 'react'

import './home.css'
import CourseDeck from '../Course/CourseDeck/CourseDeck';
import Jumbotron from './Jumbotron/Jumbotron'

export default class Home extends Component {
    render() {
        return (
            <Fragment>
                <Jumbotron />
                <CourseDeck
                    {...this.props} />
            </Fragment>

        )
    }
}
