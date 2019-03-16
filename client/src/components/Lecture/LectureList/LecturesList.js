import React, { Component, Fragment } from 'react';
import LectureListItem from '../LectureListItem/LectureListItem';
import './lecturesList.css'
import Auth from '../../../services/auth';

export default class Lectures extends Component {
    render() {
        const {
            lectures,
            selectedCourseName,
            selectedCourseId,
            handleDeleteLecture,
            handleEditLecture
        } = this.props

        if (lectures.length === 0) {
            return (
                <div className="text-center">
                    <h3>No Lectures in this {selectedCourseName} course</h3>
                </div>
            )
        }

        if (!Auth.isEnrolledByUser(selectedCourseId) && !Auth.isUserAdmin()) {
            return (
                <Fragment>
                    <div className="text-center">
                        <h3>Lectures in {selectedCourseName} course</h3>
                    </div>
                    <ul className="list-group list-group-flush list-unstyled">
                        <LectureListItem
                            key={lectures[0]._id}
                            id={lectures[0]._id}
                            title={lectures[0].title}
                            selectedCourseId={selectedCourseId}
                            handleDeleteLecture={handleDeleteLecture}
                            handleEditLecture={handleEditLecture}
                            handleVideoPlay={this.props.handleVideoPlay}

                        />
                    </ul>
                    <div className="wrapper-enroll-msg">
                        <div className="enroll-msg">
                            <h5><i>To get full access please enroll this course!</i></h5>
                        </div>
                    </div>
                </Fragment>
            )
        }


        return (
            <Fragment>
                <div className="text-center">
                    <h3>Lectures in {selectedCourseName} course</h3>
                </div>
                <ul className="list-group list-group-flush list-unstyled">
                    {this.props.lectures.map(lecture => {
                        return (
                            <LectureListItem
                                key={lecture._id}
                                id={lecture._id}
                                title={lecture.title}
                                selectedCourseId={selectedCourseId}
                                handleDeleteLecture={handleDeleteLecture}
                                handleEditLecture={handleEditLecture}
                                handleVideoPlay={this.props.handleVideoPlay}

                            />
                        )
                    })}
                </ul>
            </Fragment>
        )
    }
}


