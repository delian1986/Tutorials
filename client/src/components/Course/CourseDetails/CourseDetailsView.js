import React, {Component} from 'react'
import CourseHeader from './../CourseHeader/CourseHeader';
import courseService from '../../../services/courseService';
import Spinner from '../../Spinner/Spinner';
import Lectures from '../../Lecture/LectureList/LecturesList';

export default class CourseDetailsView extends Component{
    constructor(props){
        super(props)

        this.state={
            title:'',
            content:'',
            image:'',
            lectures:[],
            isLoading:true
        }
    }

    async componentDidMount(){
        const courseId=this.props.match.params.id
        try{
            const res=await courseService.getCourseById(courseId)

            if(res.success){
                this.setState({
                    image:res.data.image,
                    content:res.data.content,
                    title:res.data.title,
                    lectures:res.data.lectures,
                    
                    isLoading:false
                })
            }else{
                console.log(res.error);
            }
        }catch(e){

        }
    }


    render(){
        if(this.state.isLoading){
            return <Spinner/>
        }
        return(
            <div className="container">
            <CourseHeader
                {...this.state}
                {...this.props}
                />
            <Lectures
                {...this.state}/>
            </div>
        )

    }
}

