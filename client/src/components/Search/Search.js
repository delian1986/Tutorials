import React from 'react'

const Search = (props) => {
    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
                <form className="card card-sm">
                    <div className="card-body row no-gutters align-items-center">
                        <div className="col-auto">
                        </div>
                        <div className="col">
                            <input name="keyword" className="form-control form-control-lg form-control-borderless" type="search" placeholder="Search courses by title" onChange={props.handleChange} />
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Search