import {baseCallUrl} from '../utils/getUrl'
import fetch from '../utils/fetch'
console.log(baseCallUrl)
// 通讯来了
export function findCallUser (data = {}) {
  return fetch({
    baseURL: baseCallUrl,
    url: '/findCallUser',
    method: 'GET',
    params: data
  })
} 
// 回复通话状态
export function answerCall (data = {}) {
  return fetch({
    baseURL: baseCallUrl,
    url: '/answerCall',
    method: 'GET',
    params: data
  })
} 

// 根据状态查记录
export function callRecord (data = {}) {
  return fetch({
    baseURL: baseCallUrl,
    url: '/callRecord',
    method: 'GET',
    params: data
  })
} 
// 获取通讯录
export function findCallBook (data = {}) {
  return fetch({
    baseURL: baseCallUrl,
    url: '/findCallBook',
    method: 'GET',
    params: data
  })
} 
// 添加通讯群组
export function addGroup (data = {}) {
  return fetch({
    baseURL: baseCallUrl,
    url: '/addGroup',
    method: 'GET',
    params: data
  })
}
// 修改通讯群组
export function updateGroup (data = {}) {
  return fetch({
    baseURL: baseCallUrl,
    url: '/updateGroup',
    method: 'GET',
    params: data
  })
}
// 查询通讯群组
export function listGroup (data = {}) {
  return fetch({
    baseURL: baseCallUrl,
    url: '/listGroup',
    method: 'GET',
    params: data
  })
} 
// 根据部门与关键字搜索
export function findUserByDept (data = {}) {
  return fetch({
    baseURL: baseCallUrl,
    url: '/findUserByDept',
    method: 'GET',
    params: data
  })
} 
// 根据部门与关键字搜索
export function findAllDeptInfo (data = {}) {
  return fetch({
    baseURL: baseCallUrl,
    url: '/findAllDeptInfo',
    method: 'GET',
    params: data
  })
} 

