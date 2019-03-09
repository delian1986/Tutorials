import React,{Component} from 'react'
import {Route,Redirect} from 'react-router-dom'
import {UserConsumer} from './../contexts/userContext'

class AuthorizedRoute extends Component{
    render(){
        const{isLoggedIn,...otherProps }= this.props
        
        if (!isLoggedIn){
            return <Redirect to='/'/>
        }

        return <Route {...otherProps}/>
    }
}

const AuthorizedRouteWithContext = (props)=>{
    return(
        <UserConsumer>
            {
                ({isLoggedIn})=>(
                    <AuthorizedRoute 
                    {...props} 
                    isLoggedIn={isLoggedIn}
                    />
                )
            }
        </UserConsumer>
    )
}

export default AuthorizedRouteWithContext