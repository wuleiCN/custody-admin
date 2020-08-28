import request from '@/utils/request'
// 查询所有用户,未使用
export function userList(data) {
  return request({
    url: 'supervise/internal-service-basic-info/user/list',
    method: 'get'

  })
}
// 添加用户
export function addUser(data) {
  return request({
    url: 'supervise/internal-service-basic-info/user/add',
    method: 'post',
    data: {
      existFace: 2,
      existFingerprint: 2,
      policeCode: data.policeCode,
      userName: data.userName,
      userType: 1
    }
  })
}
// 修改用户状态
export function changeState(data) {
  return request({
    // url: `supervise/internal-service-basic-info/user/state/${data.state}`,
    url: `supervise/internal-service-basic-info/user/state/${data.id}/${data.state}`,
    method: 'get'
    // params: {
    //   userId: data.id,
    //   policeCode: data.policeCode
    // }
  })
}
// 重置密码
export function resetUserPassword(id) {
  return request({
    url: `supervise/internal-service-basic-info/user/repassword/${id}`,
    method: 'get'
  })
}
// 为用户绑定角色
export function bindRole(data) {
  console.log(data)
  return request({
    url: 'supervise/internal-service-basic-info/user/bindrole',
    method: 'post',
    data
  })
}
// 根据姓名或警号模糊查询用户
export function queryUser(data) {
  console.log(data)
  return request({
    url: 'supervise/internal-service-basic-info/user/find',
    method: 'post',
    data
  })
}
// 根据id查询一个
export function queryUserForId(id) {
  console.log(id)
  return request({
    url: `supervise/internal-service-basic-info/user/find/${id}`,
    method: 'get'
  })
}
// 根据id修改用户
export function editUser(data) {
  return request({
    url: 'supervise/internal-service-basic-info/user/update',
    method: 'post',
    data
  })
}

// 根据警号查询用户
export function findPolice(policecode) {
  return request({
    url: `supervise/internal-service-basic-info/user/findpolice/${policecode}`,
    method: 'get'
  })
}
// http://192.168.110.86:10010/supervise-internal-service-basic-info/user/list
