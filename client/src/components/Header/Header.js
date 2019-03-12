import React from 'react';
import { NavLink as Link } from 'react-router-dom'

import userService from './../../services/userService'

import './header.css'


const Header = (props) => {
    const { loggedIn, isAdmin,username } = props

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className='col-md-12'>
                <Link className="navbar-brand" to="/">Tutorials</Link>
                <Link className='nav-link' activeClassName='active' exact to='/'>Home</Link>

                {loggedIn && <span>Hello, {username}</span>}
                {/* anonymous */}
                {!loggedIn && <Link className='nav-link' to='/login'>Login</Link>}
                {!loggedIn && <Link className='nav-link' to='/register'>Register</Link>}

                {/* logged in user */}
                {loggedIn && !isAdmin && <Link className='nav-link' to='/courses'>Courses</Link>}

                {/* logged in admin */}
                {loggedIn && isAdmin && <Link className='nav-link' to='/create-course'>Create</Link>}
                {loggedIn && isAdmin && <Link className='nav-link' to='/add-lecture'>Add Lecture</Link>}

                {/* logged in*/}
                {loggedIn && <Link className='nav-link' to="/logout" onClick={userService.logout}>Logout</Link>}

            </div>
        </nav>
    )
}


export default Header;
