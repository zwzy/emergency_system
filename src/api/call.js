import baseCallUrl from '../utils/getUrl'
import fetch from '../utils/fetch'
console.log(baseCallUrl)
export function userInfoByPhone (data = {}) {
  return fetch({
    baseURL: baseCallUrl,
    url: '/findCallUser',
    method: 'GET',
    params: data
  })
} 

export function updateCallHistory (data = {}) {
  return fetch({
    baseURL: baseCallUrl,
    url: '/updateCall',
    method: 'GET',
    params: data
  })
} 
