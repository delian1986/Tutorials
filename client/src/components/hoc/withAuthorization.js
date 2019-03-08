import React,{Component} from 'react'

export default function withAuthorization(WrappedComponent,roles){
    return class WithAuthorization extends Component{
        constructor(props){
            super(props)

            this.state={
                role:''
            }
        }

        componentDidMount=()=>{
            let role=localStorage.getItem('role')
            if (role) {
                this.setState({ role : role });
            }
        }

        render=()=>{
            let hasAccess=roles.indexOf(this.state.role)>-1
            if(hasAccess){
                return <WrappedComponent {...this.props}/>
            }
            return <h1>No Access</h1>
            
        }
    }
}

export function withAdminAuthorization(Component){
    return withAuthorization(Component,['Admin','User'])
}