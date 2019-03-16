import fetcher from './../infrastructure/fetcher'
import Auth from './auth';


export default {
    login: async (data) => {
        const user = data
        const res = await fetcher.login(user)

       return res;
    },
    register: async (data) => {
        const user = data
        const res = await fetcher.register(user)
        
        return res
    },
    logout: () => {
        localStorage.clear()
     
    },
    getMyCourses:async()=>{
        const userId=Auth.getUserId()
        const res= await fetcher.getMyCourses(userId)
        return res

    }
}