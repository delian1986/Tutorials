import React, { Component } from 'react'

export default function withFormManager(Form, model, submitter) {
    return class FormManager extends Component {
        constructor(props) {
            super(props)

            this.state = {
                error: '',
                ...model.defaultState
            }
        }

        handleChange = e => {
            let fieldName = e.target.name
            let fieldValue = e.target.value

            this.setState({
                [fieldName]: fieldValue
            })
        }

        handleSubmit = e => {
            e.preventDefault()

            let error=model.validate(this.state)
            if(error){
                this.setState({
                    error
                })
            }

            submitter(this.state,this.props)
        }

        render=()=>{
            // console.log('FormManager', this.state);
           return( <Form 
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            {...this.state}
            />)
        }
    }
}