import {createContext} from 'react'

const defaultUserState={
    role:localStorage.getItem('role') || null,
    username:localStorage.getItem('username') || null,
    isLoggedIn:!!localStorage.getItem('token'),
    updateUser(){}
}

const {Consumer:UserConsumer, Provider:UserProvider}=createContext(defaultUserState)

export {
    UserConsumer,
    UserProvider,
    defaultUserState
}