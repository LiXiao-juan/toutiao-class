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

/**
 *
 * @param {String} data name:用户昵称 gender 性别 birthday：生日
 * @returns promise
 */
export const editUserData = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

/**
 *
 * @param {file} photo 头像
 * @returns
 */
export const editUserHeadPortrait = (file) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: file
  })
}
