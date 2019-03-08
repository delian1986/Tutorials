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

    static isUserRole(){
      let role = localStorage.getItem('role')

      if (role==='User') {
        return true
      }
      
      return false
    }
  }
  
  export default Auth