import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import Spinner from '../Spinner/Spinner';

export default class VideoPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        })
    }
    
    render() {
        if (this.state.isLoading) {
            return <Spinner />
        }

        return (
            <ReactPlayer
                url={this.props.nowPlaying}
                playing
                controls
            />
        )
    }
}