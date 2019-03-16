import React,{Component} from 'react'
import ReactPlayer from 'react-player'

export default class VideoPlayer extends Component{
    constructor(props){
        super(props)
        this.state={
            nowPlaying:''
        }
    }

    componentWillReceiveProps(){
        this.setState({
            nowPlaying:this.props.nowPlaying
        })
    }
    render(){
        return(
            <ReactPlayer url={this.state.nowPlaying}/>
        )
    }
}