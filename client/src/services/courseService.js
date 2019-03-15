import fetcher from './../infrastructure/fetcher'


export default {
    create: async (data) => {
        const course = data
        const res = await fetcher.courseCreate(course)

        return res;
    },

    getCourseById: async (id) => {
        const res = await fetcher.getCourseById(id)

        return res;
    },
    edit: async (data) => {
        const res = await fetcher.editCourse(data)

        return res;
    },
    getTop: async()=>{
        const res=await fetcher.getTopCourses()

        return res
    }
    
}