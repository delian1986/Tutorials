import { toast } from 'react-toastify';
import fetcher from './../infrastructure/fetcher'


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
    logout: (props) => {
        localStorage.clear()
        toast.success('Logout successful')

        props.history.push('/login')
    }
}