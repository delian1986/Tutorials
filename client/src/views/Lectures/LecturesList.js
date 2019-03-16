import React, { Component,Fragment } from 'react';
import LectureListItem from '../../components/Lecture/LectureListItem';

export default class Lectures extends Component {
    
    render() {
        if (this.props.lectures.length === 0) {
            return (
                <div className="text-center">
                    <h3>No Lectures in this {this.props.selectedCourseName} course</h3>
                </div>
            )
        }
        return (
            <Fragment>
            <div className="text-center">
                    <h3>Lectures in {this.props.selectedCourseName} course</h3>
                </div>
            <ul className="list-group list-group-flush list-unstyled">
                {this.props.lectures.map(lecture => {
                    return (
                        <LectureListItem
                            key={lecture._id}
                            id={lecture._id}
                            title={lecture.title}
                            selectedCourseId={this.props.selectedCourseId}
                            handleDeleteLecture={this.props.handleDeleteLecture}
                            handleEditLecture={this.props.handleEditLecture}
                        />
                    )
                })}
            </ul>
            </Fragment>
        )
    }
}


