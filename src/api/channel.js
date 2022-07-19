import request from '@/utils/request'
import storage from '@/utils/storage'
/**
 * 获取用户列表
 * @returns promise
 */
export const getMychannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 * 获取所有列表
 * @returns promise
 */
export const getAllchannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/**
 * @params 删除频道
 * @returns promise
 */
export const removeMychannels = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

export const addMychannels = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{
        id,
        seq
      }]
    }
  })
}

const TOUTIAO_CHANNEL = 'TOUTIAO_CHANNEL'
export const getMyChannelsByLocal = () => {
  return storage.get(TOUTIAO_CHANNEL)
}

export const setMyChannelToLocal = (ele) => {
  storage.set(TOUTIAO_CHANNEL, ele)
}

export const ChannelsRemoveLocal = () => {
  storage.remove(TOUTIAO_CHANNEL)
}
