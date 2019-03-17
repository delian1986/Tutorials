export default{
    
    validate:obj=>{
        const {username,password}=obj

        if(!username || username.length<3){
            return 'Username cannot be less than 3 symbols'
        }
        
        if(!password || password.length<3){
            return 'Password cannot be less than 3 symbols'
        }

       
    }
}