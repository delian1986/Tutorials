import React, { Component } from 'react';
import LectureListItem from '../../components/Lecture/LectureList';
import courseService from '../../services/courseService';

export default class Lectures extends Component {
    constructor(props) {
        super(props)


        this.state = {
            selectedCourseId: props.selectedCourseId,
            lectures: props.lectures
        }
    }

    async componentWillReceiveProps() {
        if (this.state.selectedCourseId) {
            console.log('lectures component');
            const lectures = await courseService.getCourseById(this.state.selectedCourseId)
            // console.log(lectures);
            this.setState({ lectures })
        }

    }
    render() {
        if (this.props.lectures.length === 0) {
            return (
                <div className="text-center">
                    <h3>No Lectures in this course</h3>
                </div>
            )
        }
        return (
            <div className="col-lg-12 mt20 mb20">
                <ul className="list-group">
                    {this.state.lectures.map((lecture) => <LectureListItem lecture={this.state.lectures} />)}

                </ul>
            </div>
        )
    }
}


