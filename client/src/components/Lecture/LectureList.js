import React from 'react';

const LectureListItem = (props) => {
    const { _id } = props

    return (
        <li>
        <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{_id}</h5>
        </div>
        
    </li>
    )
}


export default LectureListItem;






