import {baseUserUrl} from '../utils/getUrl'
import fetch from '../utils/fetch'
// 签到
export function sign (data = {}) {
  return fetch({
    baseURL: baseUserUrl,
    url: '/sign',
    method: 'GET',
    params: data
  })
} 