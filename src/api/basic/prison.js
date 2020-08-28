import request from '@/utils/request'

// 获取所有监区
export function getSupervisionArea(data) {
  return request({
    url: 'supervise/internal-service-basic-info/supervisionArea/selectAll',
    method: 'post',
    data
  })
}

// 获取所有监室
export function getAllSupervisionOffice(data) {
  return request({
    url: 'supervise/internal-service-basic-info/supervisionOffice/selectAll',
    method: 'post',
    data
  })
}

// 获取所有机构
export function getFatherSupervisionPrison(data) {
  return request({
    url: 'supervise/internal-service-basic-info/supervisionPrison/selectAll',
    method: 'post',
    data
  })
}

// 新增监区
export function AddSupervisionArea(data) {
  return request({
    url: 'supervise/internal-service-basic-info/supervisionArea/add',
    method: 'post',
    data
  })
}

// 根据id查询监区

export function findSupervisionArea(id) {
  return request({
    url: `supervise/internal-service-basic-info/supervisionArea/find/${id}`,
    method: 'get'
  })
}

// 根据id修改监区

export function UpdateSupervisionArea(data) {
  return request({
    url: 'supervise/internal-service-basic-info/supervisionArea/update',
    method: 'post',
    data
  })
}

// 根据id删除监区
export function DelSupervisionArea(id) {
  return request({
    url: `supervise/internal-service-basic-info/supervisionArea/delete/${id}`,
    method: 'get'
  })
}

// 新增监室
export function AddSupervisionOffice(data) {
  return request({
    url: 'supervise/internal-service-basic-info/supervisionOffice/add',
    method: 'post',
    data
  })
}

// 根据id修改监室
export function EditSupervisionOffice(data) {
  return request({
    url: 'supervise/internal-service-basic-info/supervisionOffice/update',
    method: 'post',
    data
  })
}

// 根据id删除监室
export function delSuperVisionOffice(id) {
  return request({
    url: `supervise/internal-service-basic-info/supervisionOffice/delete/${id}`,
    method: 'get'
  })
}

// 查询监区监室树状图
export function getAllSupervisionOfficeAndArea(data) {
  return request({
    url: 'supervise/internal-service-basic-info/supervisionArea/queryAll',
    method: 'post',
    data
  })
}

// 根据id查询监室
export function findSupervisionOffice(id) {
  return request({
    url: `supervise/internal-service-basic-info/supervisionOffice/find/${id}`,
    method: 'get'
  })
}
