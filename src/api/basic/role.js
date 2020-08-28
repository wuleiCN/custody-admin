import request from '@/utils/request'

// 查询所有角色
export function getAllRolesList() {
  return request({
    url: 'supervise/internal-service-basic-info/role/all',
    method: 'get'
  })
}
// 分页查询角色
export function getRolesList(data) {
  return request({
    url: 'supervise/internal-service-basic-info/role/list',
    method: 'get',
    params: data
  })
}
// 加载所有权限
export function AllPermission() {
  return request({
    url: 'supervise/internal-service-basic-info/permission/all',
    method: 'get'
  })
}
// 新增角色
export function addRole(data) {
  return request({
    url: 'supervise/internal-service-basic-info/role/add',
    method: 'post',
    data
  })
}

// 为新增角色绑定权限
export function bindPermission(data) {
  return request({
    url: 'supervise/internal-service-basic-info/role/bindpermission',
    method: 'post',
    data
  })
}

// 编辑角色名
export function editRole(data) {
  return request({
    url: 'supervise/internal-service-basic-info/role/update',
    method: 'post',
    data
  })
}

// 根据id查询角色
export function findRole(id) {
  return request({
    url: `supervise/internal-service-basic-info/role/find/${id}`,
    method: 'get'
  })
}

// 删除角色
export function delRole(id) {
  return request({
    url: `supervise/internal-service-basic-info/role/delete/${id}`,
    method: 'get'
  })
}
