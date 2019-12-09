<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Create Task</h1>
      <form @submit.prevent="sumbitHandler">
        <div class="input-field">
          <input v-model="title" id="title" type="text" class="validate" required />
          <label for="title">Title</label>
          <span class="helper-text" data-error="Title is required">Helper text</span>
        </div>
        <div class="chips" ref="chips"></div>
        <div class="input-field">
          <textarea
            v-model="description"
            id="description"
            class="materialize-textarea"
            maxlength="maxLenght"
          ></textarea>
          <label for="description">Description</label>
          <span
            class="character-counter"
            style="float: right; font-size: 12px;"
          >{{ description.length }}/{{maxLenght}}</span>
        </div>
        <input type="text" ref="datepicker" />
        <button class="btn" type="submit" to="/list">Create task</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "create",
  data: () => ({
    title: "",
    description: "",
    maxLenght: 2048,
    chips: null,
    date: null
  }),
  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "Tags task"
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yy",
      defaultDate: new Date(),
      setDefaultDate: true
    });
  },
  methods: {
    sumbitHandler() {
      const task = {
        title: this.title,
        description: this.description,
        id: Date.now(),
        status: "active",
        tags: this.chips.chipsData,
        date: this.date.date
      };
      this.$store.dispatch("createTask", task);
      this.$router.push("/list");
    },
    destroed() {
      if (this.date && this.date.destroy) {
        this.date.destroy();
      }
      if (this.chips && this.chips.destroy) {
        this.chips.destroy();
      }
    }
  },
  components: {}
};
</script>
