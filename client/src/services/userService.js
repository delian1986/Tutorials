import { toast } from 'react-toastify';
import fetcher from './../infrastructure/fetcher'


export default {
    login: async (data, props) => {
        const user = data
        const res = await fetcher.login(user)

        if (res.success) {
            localStorage.setItem('token', res.token)
            localStorage.setItem('username', res.user.username)
            localStorage.setItem('role', res.user.roles)
            toast.success(res.message)
            
            return true

        } else {
            if (res.errors) {
                Object.entries(res.errors).forEach(([e, msg]) => {
                    toast.error(msg)
                })
            } else {
                toast.error(res.message)
            }
            
            return false
        }

    },
    register: async (data, props) => {
        const user = data
        const res = await fetcher.register(user)
        if (res.success) {
            toast.success(res.message)
            props.history.push('/login')
        } else {
            if (res.errors) {
                Object.entries(res.errors).forEach(([e, msg]) => {
                    toast.error(msg)
                })
            } else {
                toast.error(res.message)
            }
        }
    },
    logout: (props) => {
        localStorage.clear()
        toast.success('Logout successful')

        props.history.push('/login')
    }
}