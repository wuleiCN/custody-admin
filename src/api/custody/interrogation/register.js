import request from '@/utils/request'

export const setCustodyStatistics = data => {
  return request({
    url: 'supervise/reception-custody-watch/solutionArraignRegister/add',
    method: 'post',
    data
  })
}
