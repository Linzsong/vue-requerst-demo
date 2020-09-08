<template>
  <div class="hello">
    <router-link to="/">home</router-link>
    <router-link to="/About">about</router-link>

    <h1>HOME</h1>
    <div>this is home page</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    goHome() {
      this.$router.push({
        path: "/"
      });
    },
    goAbout() {
      this.$router.push({
        path: "/About"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table {
  height: calc(var(--wvh) * 51.5);
  overflow: auto;
  display: block;
}
.mytable tr td {
  height: calc(var(--wvh) * 3);
  padding: 0.45vw 0.7vw;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
