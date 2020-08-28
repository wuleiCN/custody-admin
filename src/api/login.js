import request from '@/utils/request'

export function login(username, password, code, uuid) {
  return request({
    url: 'supervise/authentication-manager/authorization/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: 'supervise/internal-service-basic-info/user',
    method: 'get'
  })
}

export function getCodeImg() {
  return request({
    url: 'auth/code',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'supervise/authentication-manager/authorization/logout',
    method: 'delete'
  })
}

export function test() {
  return request({
    url: 'supervise/internal-service-basic-info',
    method: 'post'
  })
}
