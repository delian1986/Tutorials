import React, { Fragment } from 'react';
import Auth from '../../../services/auth';
import './lectureListItem.css'

const LectureListItem = (props) => {
    const { id,
        title,
        selectedCourseId,
        handleVideoPlay,
        isInEditMode,
        nowPlayingLectureId
    } = props
    const isAdmin = Auth.isUserAdmin()
    return (
        <li>
            <div className="list-group-item">
                <h5 className="mb-1" key={id}>
                    {title}
                </h5>
                {
                    isAdmin && isInEditMode
                        ?
                        <span className="float-right">
                            <button className="btn btn-secondary" onClick={(e) => props.handleEditLecture(e, id)} >Edit</button>
                            <button className="btn btn-danger" onClick={(e) => props.handleDeleteLecture(e, id, selectedCourseId)}>Delete</button>
                        </span>
                        :
                        <Fragment>
                            {
                                nowPlayingLectureId === id ?
                                <span className="icon"><i className="fa fa-play fa-3x" ></i></span>
                                :
                                <span><button className="btn btn-warning" onClick={(e) => handleVideoPlay(e, id)}>Play!</button></span>
                            }

                            {
                                Auth.isInWatchedVideos(id) &&
                                <i className="fa fa-check-circle pull-right fa-3x"></i>
                            }
                        </Fragment>
                }
            </div>
        </li>
    )
}


export default LectureListItem;






