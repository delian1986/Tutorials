import React from 'react';
import {Link} from 'react-router-dom'

import './myCourseCard.css';
import ProgressBar from '../../ProgressBar/ProgressBar';

const MyCourseCard = (props) => {
    const { id, title, content, image,lectures } = props
    return (
        <div className="card">
            <Link to={`/course/details/${id}`}><img className="card-img-top" src={image} alt={title}/></Link>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
               <ProgressBar
                lectures ={lectures}
               />

            </div>
        </div>
    )
}

export default MyCourseCard

