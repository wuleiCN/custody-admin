import request from '@/utils/request'
// 查找收押列表
export const CustodyInformation = data => {
  return request({
    url: '/supervise/reception-custody-watch/personCustodyInformation/list',
    method: 'post',
    data: data
  })
}
// 新增收押信息
export const addCustodyInformation = data => {
  return request({
    url: '/supervise/reception-custody-watch/personCustodyInformation/add',
    method: 'post',
    data: data
  })
}
// 根据ID查找收押信息
export const personCustodyInformationById = id => {
  return request({
    url: `/supervise/reception-custody-watch/personCustodyInformation/find/${id}`,
    method: 'get'
  })
}
// 登记
export const personCustodyInformationUpdate = data => {
  return request({
    url: '/supervise/reception-custody-watch/personCustodyInformation/update',
    method: 'post',
    data: data
  })
}
// 办理收押/暂缓收押/不予收押
export const personCustodyInformationRej = data => {
  return request({
    url: '/supervise/reception-custody-watch/personCustodyInformation/custody',
    method: 'post',
    data: data
  })
}
// 上传文件
export const fileUpdata = data => {
  return request({
    url: '/supervise/fastdfs-client/upload',
    method: 'post',
    data: data
  })
}
// 删除物品
export const goodsDelete = id => {
  return request({
    url: `/supervise/reception-custody-watch/personStorageInformation/delete/${id}`,
    method: 'get'
  })
}
// 删除同案人员
export const accpDelete = id => {
  return request({
    url: `/supervise/reception-custody-watch/personCustodyMatchInfomation/delete/${id}`,
    method: 'get'
  })
}
// 查找病室
export const getOffice = () => {
  return request({
    url: '/supervise/internal-service-basic-info/supervisionOffice/selectAll',
    method: 'post',
    data: {}
  })
}
// 查找同案人员
export const getPartnerList = (data) => {
  return request({
    url: 'supervise/reception-custody-watch/personCustodyMatchInfomation/listCustody',
    method: 'post',
    data: data
  })
}
// 根据证件查找办案信息
export const findSuggestion = (data) => {
  return request({
    url: 'supervise/reception-custody-watch/personCustodyInformation/findSuggestion',
    method: 'post',
    data: data
  })
}
