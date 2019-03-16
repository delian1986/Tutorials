import React, { Component,Fragment } from 'react';
import LectureListItem from '../LectureListItem.css/LectureListItem';

export default class Lectures extends Component {
    render() {
        const {
            lectures,
            selectedCourseName,
            selectedCourseId,
            handleDeleteLecture,
            handleEditLecture
        }=this.props

        if (lectures.length === 0) {
            return (
                <div className="text-center">
                    <h3>No Lectures in this {selectedCourseName} course</h3>
                </div>
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
                        />
                    )
                })}
            </ul>
            </Fragment>
        )
    }
}


