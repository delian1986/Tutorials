import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import Auth from '../../services/auth';

export default function withAuthorization(WrappedComponent, roles) {
    return class WithAuthorization extends Component {
        constructor(props) {
            super(props)

            this.state = {
                role: Auth.getRole()
            }
        }


        render = () => {
            let hasAccess = roles.indexOf(this.state.role) > -1
            if (hasAccess) {
                return (
                    <WrappedComponent {...this.props} />
                )
            }
            return(
                <Redirect to='/'/>
            ) 

        }
    }
}

export function withAdminAuthorization(Component, allowedRoles) {
    return withAuthorization(Component, allowedRoles)
}