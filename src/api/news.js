import request from '@/utils/request'

export const getArticlesList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}

/**
 *
 * @param {String} id //文章id
 * @returns Promise
 */
export const getArticlesInfo = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}
