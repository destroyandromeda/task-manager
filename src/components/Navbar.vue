<template>
  <nav class="green darken-1">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">Tasks Manager</router-link>
      <ul class="right hide-on-med-and-down">
        <router-link tag="li" to="/" exact active-class="active">
          <a href="#">Create</a>
        </router-link>
        <router-link tag="li" to="/list" exact active-class="active">
          <a href="#">List</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
nav {
  padding: 0 2rem;
}
</style>