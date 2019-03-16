import React, { Fragment } from 'react'
import Auth from '../../../services/auth';
import VideoPlayer from './../../VideoPlayer/VideoPlayer'
import './courseHeader.css'
import ProgressBar from '../../ProgressBar/ProgressBar';

const CourseHeader = (props) => {

    const { 
        title, 
        content, 
        image, 
        nowPlaying, 
        isPlaying,
        lectures
    } = props
    const id = props.match.params.id

    return (
        <Fragment>
            <h1 className="my-4">Course title : {title}
            </h1>

            <div className="row">
                {
                    isPlaying
                        ?
                        <VideoPlayer
                        nowPlaying={nowPlaying}
                        />
                        
                        :
                        <div className="col-md-8">
                            <img className="img-fluid" src={image} alt="{title}" />
                        </div>
                }


                <div className="col-md-4 text-center">
                    <h3 className="my-3">Course Description</h3>
                    <p>{content}</p>
                    {
                        !Auth.isUserAuthenticated()
                            ?
                            <button className="btn btn-success" onClick={() => props.history.push('/login')}>Login To Enroll</button>
                            :
                            !Auth.isEnrolledByUser(id) && !Auth.isUserAdmin()
                                ?
                                <button className="btn btn-primary" onClick={(e) => props.handleEnroll(e, id)}>Enroll Now</button>
                                :
                                ''
                    }
                    {
                        Auth.isUserAdmin()
                            ?
                            <button className="btn btn-warning" onClick={() => props.history.push(`/edit-course/${id}`)}>Edit Course</button>
                            :
                            ''
                    }
                    {
                        Auth.isEnrolledByUser(id)
                        &&
                        <ProgressBar
                        lectures={lectures}
                        />
                    }
                </div>
            </div>
        </Fragment>
    )

}

export default CourseHeader
