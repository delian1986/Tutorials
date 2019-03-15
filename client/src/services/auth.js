class Auth {
    static isUserAuthenticated () {
      return localStorage.getItem('token') !== null
    }
  
    static getToken () {
      return localStorage.getItem('token')
    }
  
    static getUsername () {
      return localStorage.getItem('username')
    }
  
    static isUserAdmin () {
      let role = localStorage.getItem('role')
      
      if (role==='Admin') {
        return true
      }
  
      return false
    }

    static getRole(){
      return localStorage.getItem('role')
    }

    static getUserId(){
      return localStorage.getItem('userId')
    }

    static isEnrolledByUser(courseId){
      const rawString=localStorage.getItem('enrolledCourses') ||''
      let enrolledCourses=rawString.split(',')
      
      return enrolledCourses.indexOf(courseId)>-1
    }
  }
  
  export default Auth