import request from '@/utils/request'

export const getList = data => {
  return request({
    url: 'supervise/reception-custody-watch/personCustodyInformation/listByBook',
    method: 'post',
    data
  })
}
export const getDetail = id => {
  return request({
    url: 'supervise/reception-custody-watch/personCustodyInformation/find/' + id,
    method: 'get'
  })
}
export const update = params => {
  return request({
    url: 'supervise/reception-custody-watch/personCustodyInformation/update',
    method: 'post',
    data: params
  })
}
export const delImage = id => {
  return request({
    url: 'supervise/reception-custody-watch/personBodyStatusInformation/delete/' + id,
    method: 'get'
  })
}
export const delStorage = id => {
  return request({
    url: 'supervise/reception-custody-watch/personStorageInformation/delete/' + id,
    method: 'get'
  })
}
export const delMatche = id => {
  return request({
    url: 'supervise/reception-custody-watch/personCustodyMatchInfomation/delete/' + id,
    method: 'get'
  })
}
export const supervisionOffice = () => {
  return request({
    url: 'supervise/internal-service-basic-info/supervisionOffice/selectAll',
    method: 'post',
    data: { resultSize: 100000 }
  })
}
