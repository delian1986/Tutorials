import fetcher from './../infrastructure/fetcher'


export default {
    create: async (data) => {
        const lecture = data
        const res = await fetcher.courseCreate(lecture)

       return res;
    },
    
    // getCourseById: async(id)=>{
    //     const res = await fetcher.getCourseById(id)

    //    return res;
    // }
}