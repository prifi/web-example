import { getPermissions, getUserPermissions } from '@/api/system/permission'

const getDefaultState = () => {
  return {
    menus: [],
    permisaction: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_PERMISSIONS: (state, permisaction) => {
    state.permisaction = permisaction
  }
}

const actions = {
  // get router
  getRouter({ commit, state }) {
    return new Promise((resolve, reject) => {
      getPermissions().then(response => {
        const menus = response.data
        if (!menus) {
          reject('未查询到菜单数据，请确认。')
        }

        menus.push({ path: '*', redirect: '/404', hidden: true })

        commit('SET_MENUS', menus)

        resolve(menus)
      })
    })
  },
  getPermissions({ commit, state }) { // 新增
    return new Promise((resolve, reject) => {
      getUserPermissions().then(res => {
        commit('SET_PERMISSIONS', res.data)
        resolve(res.data)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

