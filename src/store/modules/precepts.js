// import { data } from 'autoprefixer'

const state = {
  operationData: [],
  inputDialogVisible: false,
  examinationDialogVisible: false,
  editFormDialog: false
}

const mutations = {
  SET_Operation: (state, data) => {
    state.operationData = data
  },
  inputDialog_Visible: (state, data) => {
    state.inputDialogVisible = data
  },
  examination_DialogVisible: (state, data) => {
    state.examinationDialogVisible = data
  },
  editForm_Dialog: (state, data) => {
    state.editFormDialog = data
  }
}

const actions = {
  setOperationData({ commit }, operationData) {
    commit('SET_Operation', operationData)
  },
  inputDialogVisible({ commit }, inputDialogVisible) {
    commit('inputDialog_Visible', inputDialogVisible)
  },
  examinationDialogVisible({ commit }, examinationDialogVisible) {
    commit('examination_DialogVisible', examinationDialogVisible)
  },
  editFormDialog({ commit }, editFormDialog) {
    commit('editForm_Dialog', editFormDialog)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
