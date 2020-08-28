import request from '@/utils/request'

export const findAllRoom = data => {
  return request({
    url: 'supervise/reception-custody-watch/arraignRoomState/find',
    method: 'get'
  })
}
export const findRoom = data => {
  return request({
    url: 'supervise/reception-custody-watch/arraignRoomState/findroom',
    method: 'get'
  })
}
export const findschedule = data => {
  return request({
    url: 'supervise/reception-custody-watch/arraignRoomState/findschedule',
    method: 'get'
  })
}
export const findtime = data => {
  return request({
    url: 'supervise/reception-custody-watch/arraignRoomState/findtime',
    method: 'get'
  })
}
export const scheduleUpdate = data => {
  return request({
    url: 'supervise/reception-custody-watch/arraignRoomState/update',
    method: 'post',
    data
  })
}
export const arrange = data => {
  return request({
    url: 'supervise/reception-custody-watch/arraignRoomState/arrange',
    method: 'post',
    data
  })
}
export const cancelArrange = data => {
  return request({
    url: 'supervise/reception-custody-watch/arraignRoomState/finish',
    method: 'post',
    data
  })
}
