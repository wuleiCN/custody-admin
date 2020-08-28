import { getDictDesc } from '@/api/basic/dict'
import Vue from 'vue'

const state = {
  dict: {}
}

const getters = {
  dict: state => state.dict
}

const mutations = {
  SET_DICTITEM(state, { data, key }) {
  //  state.dict[key] = data
    Vue.set(state.dict, key, data)
  },
  SET_DICTDETAIL(state, { data, key }) {
    state.dict[key] = data
  }
}

const actions = {
  getDictDesc({ commit }, id) {
    return new Promise((reslove, reject) => {
      getDictDesc({ id: id }).then(data => {
        commit('SET_DICTITEM', { data: data.dic, key: id })
        commit('SET_DICTDETAIL', { data: data, key: `_${id}` })
        reslove(data.dic)
      })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
