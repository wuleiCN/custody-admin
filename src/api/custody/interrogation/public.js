import request from '@/utils/request'

export const getList = data => {
  return request({
    url: 'supervise/reception-custody-watch/solutionArraignRegister/listByBook',
    method: 'post',
    data
  })
}
export const approved = (data) => {
  return request({
    url: 'supervise/reception-custody-watch/solutionArraignRegister/approved',
    method: 'get',
    params: data
  })
}

export const findById = (id) => {
  return request({
    url: 'supervise/reception-custody-watch/solutionArraignRegister/find/' + id,
    method: 'get'
  })
}
