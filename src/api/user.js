import request from '@/utils/request'
import store from '@/store'
/**
 *
 * @param {String} mobile
 * @param {String} code
 * @returns //promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

export const sendCode = mobile => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}

/**
 *  获取用户资料
 * @returns promise
 */
export const getUserProfile = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
