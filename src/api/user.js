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
// 登录
export function login (data = {}) {
  return fetch({
    baseURL: baseUserUrl,
    url: '/login',
    method: 'POST',
    params: data
  })
} 

// 获取分机绑定ip列表

export function getIpBindList (data = {}) {
  return fetch({
    baseURL: baseUserUrl,
    url: '/getIpBindExtNumList',
    method: 'GET',
    params: data
  })
} 

// 新建 ip绑定
// 获取分机绑定ip列表
// 新建ip绑定
export function createIpBindExtNum (data = {}) {
  return fetch({
    baseURL: baseUserUrl,
    url: '/ipBindExtNum  ',
    method: 'GET',
    params: data
  })
} 
// 更新ip绑定
export function updateIpBindExtNum (data = {}) {
  return fetch({
    baseURL: baseUserUrl,
    url: '/updateIpBindExtNum ',
    method: 'GET',
    params: data
  })
} 


