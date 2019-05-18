import baseCallUrl from '../utils/getUrl'
import fetch from '../utils/fetch'
console.log(baseCallUrl)
export function callStart (data = {}) {
  return fetch({
    baseURL: baseCallUrl,
    url: '/IPServer/comm/start',
    method: 'post',
    data: data
  })
} 
