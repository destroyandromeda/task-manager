import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
      if (new Date(task.date) < new Date()) {
        task.status = 'outdated'
      }
      return task;
    })
  },
  mutations: {
    createTask(state, task) {
      task.status = new Date(task.date) >= new Date() ? 'active' : 'outdated'
      state.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask(state, { id, description, date }) {
      const tasks = state.tasks.concat()

      const idx = tasks.findIndex(t => t.id === id)
      const task = tasks[idx]
      const status = new Date(date) >= new Date() ? 'active' : 'outdated'
      tasks[idx] = { ...task, date, description, status }
      state.tasks = tasks
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    completeTask(state, id) {
      const idx = state.tasks.findIndex(t => t.id === id)
      if (state.tasks[idx].status == 'active') {
        state.tasks[idx].status = 'completed'
      } else {
        state.tasks[idx].status = 'active'
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    deleteTask(state, id) {
      const idx = state.tasks.findIndex(t => t.id === id)
      state.tasks.splice(idx, 1)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  actions: {
    createTask({ commit }, task) {
      commit('createTask', task)
    },
    updateTask({ commit }, task) {
      commit('updateTask', task)
    },
    completeTask({ commit }, id) {
      commit('completeTask', id)
    },
    deleteTask({ commit }, id) {
      commit('deleteTask', id)
    },
  },
  modules: {
  },
  getters: {
    tasks: s => s.tasks,
    taskById: s => id => s.tasks.find(t => t.id === id)
  }
})
