<template>
  <div class="row">
    <div v-if="task" class="col s6 offset-s3">
      <h1>{{task.title}}</h1>

      <form @submit.prevent="sumbitHandler">
        <div class="chips" ref="chips"></div>
        <div class="input-field">
          <textarea
            v-model="description"
            id="description"
            class="materialize-textarea"
            maxlength="maxLenght"
            style="min-height:200px"
          ></textarea>
          <label for="description">Description</label>
          <span
            class="character-counter"
            style="float: right; font-size: 12px;"
          >{{ description.length }}/{{maxLenght}}</span>
        </div>
        <input type="text" ref="datepicker" />
        <div v-if="task.status === 'active'">
          <button class="btn" type="submit" style="margin-right:1rem">Update task</button>
          <button class="btn blue" type="button" style="margin-right:1rem" @click="completeTask">Complete task</button>
          <button class="btn red" type="button" @click="deleteTask">Delete task</button>
        </div>
        <div v-else>
          <button class="btn blue" type="button" style="margin-right:1rem" @click="completeTask">Active task</button>
          <button class="btn red" type="button" @click="deleteTask">Delete task</button>
        </div>
      </form>
    </div>
    <h2 v-else>This task not found</h2>
  </div>
</template>

<script>
export default {
  computed: {
    task() {
      return this.$store.getters.taskById(+this.$route.params.id);
    }
  },
  data: () => ({
    description: "",
    maxLenght: 2048,
    chips: null,
    date: null
  }),
  mounted() {
    this.description = this.task.description;
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "Tags task",
      data: this.task.tags
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yy",
      defaultDate: new Date(this.task.date),
      setDefaultDate: true
    });
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  methods: {
    sumbitHandler() {
      this.$store.dispatch("updateTask", {
        id: this.task.id,
        description: this.description,
        date: this.date.date
      });
      this.$router.push("/list");
    },
    destroed() {
      if (this.date && this.date.destroy) {
        this.date.destroy();
      }
      if (this.chips && this.chips.destroy) {
        this.chips.destroy();
      }
    },
    completeTask() {
      this.$store.dispatch("completeTask", this.task.id);
      this.$router.push("/list");
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.task.id);
      this.$router.push("/list");
    }
  }
};
</script>

<style>
</style>