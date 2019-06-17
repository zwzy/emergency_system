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
<<<<<<< HEAD
// 签到总览
export function signView (data = {}) {
  return fetch({
    baseURL: baseUserUrl,
    url: '/signShow',
    method: 'GET',
    params: data
  })
}
// 签到记录
export function signList (data = {}) {
  return fetch({
    baseURL: baseUserUrl,
    url: '/signList',
    method: 'GET',
    params: data
  })
}
=======
// 签到列表
export function signList (data = {}) {
  return fetch({
    baseURL: baseUserUrl,
    url: '/signList',
    method: 'GET',
    params: data
  })
} 
// 签到总览
export function signShow (data = {}) {
  return fetch({
    baseURL: baseUserUrl,
    url: '/signShow',
    method: 'GET',
    params: data
  })
} 
>>>>>>> 20fbc8da82d871a761f0130c5e9c12cfafe79415
