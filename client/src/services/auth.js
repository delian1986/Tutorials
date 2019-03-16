class Auth {
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static getUsername() {
    return localStorage.getItem('username')
  }

  static isUserAdmin() {
    let role = localStorage.getItem('role')

    if (role === 'Admin') {
      return true
    }

    return false
  }

  static getRole() {
    return localStorage.getItem('role')
  }

  static getUserId() {
    return localStorage.getItem('userId')
  }

  static isEnrolledByUser(courseId) {
    const rawString = localStorage.getItem('enrolledCourses') || ''
    let enrolledCourses = rawString.split(',')

    return enrolledCourses.indexOf(courseId) > -1
  }

  static isInWatchedVideos(lectureId) {
    const rawString = localStorage.getItem('watchedVideos') || ''
    let watchedVideos = rawString.split(',')

    return watchedVideos.indexOf(lectureId) > -1
  }

  static progress(lectures) {
    const rawString = localStorage.getItem('watchedVideos') || ''
    let watchedVideos = rawString.split(',')
    let numberOfWatched = 0;
    let numberOfLectures = lectures.length

      for (const lecture of lectures) {
        if(lecture.hasOwnProperty('_id')){
          if(watchedVideos.indexOf(lecture._id)>-1){
            numberOfWatched++
          }
        }else{
          if(watchedVideos.indexOf(lecture)>-1){
            numberOfWatched++
          }
        }
        
      }

    return numberOfWatched / numberOfLectures * 100
  }

  static myCourses(){
    const rawString = localStorage.getItem('enrolledCourses') || ''
    let enrolledCourses = rawString.split(',')

    return enrolledCourses
  }
}

export default Auth