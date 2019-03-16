import React, { Component, Fragment } from 'react'

import './home.css'
import TopCourseDeck from '../Course/CourseDeck/CourseDeck';
import Jumbotron from './Jumbotron/Jumbotron'

export default class Home extends Component {
    render() {
        return (
            <Fragment>
                <Jumbotron />
                <TopCourseDeck
                    {...this.props} />
            </Fragment>

        )
    }
}
