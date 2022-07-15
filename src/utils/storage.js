// 封装
class Storage {
  set (key, value) {
    // localStorage.setItem(TOKEN, JSON.stringify(payload))
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  get (key) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (error) {
      return localStorage.getItem(key)
    }
  }

  remove (key) {
    localStorage.removeItem(key)
  }
}

const storage = new Storage()

export default storage
