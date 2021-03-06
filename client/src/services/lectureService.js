import fetcher from './../infrastructure/fetcher'


export default {
    create: async (data) => {
        const lecture = data
        const res = await fetcher.createLecture(lecture)

       return res;
    },
    delete:async(data)=>{
        const res=await fetcher.deleteLecture(data)

        return res
    },
    edit:async(data)=>{
        const res=await fetcher.editLecture(data)

        return res
    },
    addToWatched:async(data)=>{
        const res = await fetcher.addLectureToWatched(data)

        return res
    }
    
    // getCourseById: async(id)=>{
    //     const res = await fetcher.getCourseById(id)

    //    return res;
    // }
}