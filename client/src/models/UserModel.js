export default{
    defaultState:{
        username:'',
        password:''
    },

    validate:obj=>{
        const {username,password}=obj

        if(!username){
            return 'Username cannot be empty'
        }
        
        if(!password){
            return 'Password cannot be empty'
        }
    }
}