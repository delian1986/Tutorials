import React from 'react'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import Auth from '../../services/auth';

const ProgressBar = (props) => {
    const { lectures } = props
    const percent = Auth.progress(lectures)

    return (
        <div className="progress-block">
            <p>Your progress in this course</p>
            <Progress percent={Math.trunc(percent)} />
        </div>
    )
}

export default ProgressBar