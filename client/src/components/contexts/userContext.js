import {createContext} from 'react'

const defaultUserState={
    roles:[],
    username:null,
    isLoggedIn:!!localStorage.getItem('token'),
    updateUser(){}
}

const {Consumer:UserConsumer, Provider:UserProvider}=createContext(defaultUserState)

export {
    UserConsumer,
    UserProvider,
    defaultUserState
}