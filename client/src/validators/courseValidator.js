export default{
    
    validate:obj=>{
        const {title,content,image}=obj

        if(!title || title.length<3){
            return 'Title cannot be less than 3 symbols'
        }
        
        if(!content || content.length<10){
            return 'Content cannot be less than 10 symbols'
        }
        if(!image ||!image.startsWith('http')){
            return 'Image Url must be valid url !'

        }
    }
}