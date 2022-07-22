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

/**
 *
 * @param {String} type //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param {String} source //源id，文章id或评论id
 * @param {String} offset //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * @param {String} limit //获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量

 * @returns promise
 */
export const getcomment = (type, source, offset, limit) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}

/**
 *
 * @param {String} target //评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * @param {String} content //评论内容
 * @param {String} artId //文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数
 * @returns promise
 */
export const getarticlecomments = (target, content, artId) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: artId
    }
  })
}

/**
 *
 * @param {String} target //点赞的评论id
 * @returns Promise
 */
// 点赞
export const getlikings = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 *  收藏文章
 * @param {integer} target 文章id
 * @returns promise
 */
export const collect = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 *
 * @param {*} target 取消收藏的文章
 * @returns   promise
 */
export const delCollect = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

/**
 *
 * @param {*} target 用户id
 * @returns  promise
 */
export const followings = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 *
 * @param {*} target 用户id
 * @returns  promise
 */
export const delFollow = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

/**
 *  点赞
 * @param {*} target 文章的id
 * @returns  Promise
 */
export const addGoods = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 *  取消点赞
 * @param {*} target 文章的id
 * @returns  Promise
 */
export const delGoods = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
