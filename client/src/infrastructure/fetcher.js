import Auth from './../services/auth'

const HOST = 'http://127.0.0.1:5000'


const fetcher = {
  async register(data) {
    const res = await fetch(`${HOST}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return res.json()
  },

  async login(data) {
    const res = await fetch(`${HOST}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return res.json()
  },
  async courseCreate(data) {
    const res = await fetch(`${HOST}/course/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + Auth.getToken()
      },
      body: JSON.stringify(data)
    })

    return res.json()
  },
  async getAllCoursesNames() {
    const res = await fetch(`${HOST}/course/allNames`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + Auth.getToken()
      }
    })

    return res.json()
  },
  async getCourseById(id) {
    const res = await fetch(`${HOST}/course/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return res.json()
  },
  async createLecture(data){
    const res = await fetch(`${HOST}/lecture/create`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + Auth.getToken()
      }
    })
  
    return res.json()
  }
}



export default fetcher