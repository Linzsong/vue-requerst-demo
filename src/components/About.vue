<template>
  <div>
    <router-link to="/">home</router-link>
    <router-link to="/About">about</router-link>
    <H1>ABOUT</H1>
    <div>this is about page</div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push({
        path: "/",
      });
    },
    goAbout() {
      this.$router.push({
        path: "/About",
      });
    },
  },
};
</script>

<style>
</style>