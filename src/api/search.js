import request from '@/utils/request'

/**
 *
 * @param {String} q 关键词
 * @returns Promise
 */
// 获取搜索建议
export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 *
 * @param {String} page 页数
 * @param {String} per_page 每页数量
 * @param {String} q 关键词
 * @returns Promise
 */
// 获取搜索结果
export const getSearchResults = (q, page, perPage) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page: perPage,
      q
    }
  })
}
