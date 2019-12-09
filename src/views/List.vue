<template>
  <div>
    <h1>List</h1>

    <div class="row">
      <div class="input-field col s6">
        <select class ref="select" v-model="filter">
          <option value="all" selected>All</option>
          <option value="active">Active</option>
          <option value="outdated">Outdated</option>
          <option value="completed">Completed</option>
        </select>
        <label>Status filter</label>
      </div>
    </div>
    <hr />
    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Date</th>
          <th>Description</th>
          <th>Status</th>
          <th>open</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in displayTasks" :key="task.id">
          <td>{{index+1}}</td>
          <td>{{task.title}}</td>
          <td>{{new Date(task.date).toLocaleDateString()}}</td>
          <td class="td">
            <div class="text">{{task.description}}</div>
          </td>
          <td>{{task.status}}</td>
          <td>
            <router-link tag="button" class="btn btn-small" :to="'/task/'+ task.id">Open</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No tasks</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    filter: null
  }),
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    displayTasks() {
      return this.tasks.filter(t => {
        if (!this.filter || this.filter === 'all') {
          return true;
        }
        return t.status === this.filter;
      });
    }
  },
  mounted() {
    M.FormSelect.init(this.$refs.select, {});
  }
};
</script>

<style lang="scss" scoped>
.text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.td {
  max-width: 400px;
}
</style>