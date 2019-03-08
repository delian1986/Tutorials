import React, { Component,Fragment } from 'react'

import './home.css'
import CoursesDeck from './../Courses/CoursesDeck';
import Jumbotron from './Jumbotron';

export default class Home extends Component {
    render() {
        return (
            <Fragment>
            <Jumbotron/>
            <CoursesDeck />
            </Fragment>

        )
    }
}
