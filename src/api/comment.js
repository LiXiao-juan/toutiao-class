import request from '@/utils/request'

/**
 *
 * @param {String} target 点赞的评论id
 * @returns  promise
 */
// 评论点赞
export const commitLikings = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消评论点赞
export const delCommitLikings = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}
