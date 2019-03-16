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
    const res = await fetch(`${HOST}/course/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + Auth.getToken()
      }
    })

    return res.json()
  },
  async getCourseById(id) {
    const res = await fetch(`${HOST}/course/details/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return res.json()
  },
  async createLecture(data) {
    const res = await fetch(`${HOST}/lecture/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + Auth.getToken()
      },
      body: JSON.stringify(data)
    })

    return res.json()
  },
  async deleteLecture(data) {
    const res = await fetch(`${HOST}/lecture/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + Auth.getToken()
      },
      body: JSON.stringify(data)
    })

    return res.json()
  },
  async editLecture(data){
    const res = await fetch(`${HOST}/lecture/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + Auth.getToken()
      },
      body: JSON.stringify(data)
    })

    return res.json()
  },
  async editCourse(data){
    const res = await fetch(`${HOST}/course/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + Auth.getToken()
      },
      body: JSON.stringify(data)
    })

    return res.json()
  },

  async deleteCourse(data){
    const res = await fetch(`${HOST}/course/clear/${data}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + Auth.getToken()
      },
      body: JSON.stringify(data)
    })

    return res.json()
  },
  async getTopCourses(){
    const res = await fetch(`${HOST}/course/top`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return res.json()
  },
  async enrollCourse(data){
    const res = await fetch(`${HOST}/course/enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + Auth.getToken()
      },
      body: JSON.stringify(data)
    })

    return res.json()
  },
  async addLectureToWatched(data){
    const res = await fetch(`${HOST}/lecture/addToWatched`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + Auth.getToken()
      },
      body: JSON.stringify(data)
    })

    return res.json()
  },
  async getMyCourses(id){
    const res = await fetch(`${HOST}/course/myCourses/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return res.json()
  },
 
}



export default fetcher