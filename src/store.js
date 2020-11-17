import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todoList: []
  },
  mutations: {
    updateTodoList (state, payload) {
      switch (payload.action) {
        case 'ADD':
          state.todoList.push(payload.data)
          break
        case 'REMOVE':
          state.todoList.splice(payload.data.index, 1)
          break
        case 'UPDATE':
          state.todoList.forEach((item, _index) => {
            if (_index === payload.data.index) {
              item[payload.data.param] = payload.data[payload.data.param]
            }
          })
          break
      }
    }
  }
})
export default store
