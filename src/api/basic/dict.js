import request from '@/utils/request'
// 获取全部字典，及分页
export function getDictList(data) {
  return request({
    url: 'supervise/internal-service-basic-info/dictionaryType/select',
    method: 'post',
    data
  })
}
// 根据id获取字典
export function getDictDesc(data) {
  return request({
    url: 'supervise/internal-service-basic-info/dictionaryType/orderQuery',
    method: 'post',
    data
  })
}
// 根据id删除字典
export function delDict(id) {
  return request({
    url: `supervise/internal-service-basic-info/dictionaryType/delete/${id}`,
    method: 'post',
    data: {
      id
    }
  })
}
// 查询字典

export function queryDict(data) {
  return request({
    url: 'supervise/internal-service-basic-info/dictionaryType/select',
    method: 'post',
    data
  })
}

// 新增字典
export function addDict(data) {
  return request({
    url: 'supervise/internal-service-basic-info/dictionaryType/add',
    method: 'post',
    data
  })
}

// 根据id修改字典
export function editDict(data) {
  return request({
    url: 'supervise/internal-service-basic-info/dictionaryType/update',
    method: 'post',
    data
  })
}

// 根据id删除字典明细

export function delDictionChildren(id) {
  return request({
    url: `supervise/internal-service-basic-info/dictionaryType/remove/${id}`,
    method: 'get'
  })
}

// 根据id添加字典明细

export function addDictionChildren(data) {
  return request({
    url: 'supervise/internal-service-basic-info/dictionaryType/addByTypeId',
    method: 'post',
    data
  })
}
