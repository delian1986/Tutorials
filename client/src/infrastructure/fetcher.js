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
  }
  
}



export default fetcher