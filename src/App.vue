<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import light from "@/assets/light.jpg"
export default {
  name: 'App',
  components: {
  },
  beforeMount() {
    this.$("body").css("background",`url(${light}) center no-repeat`);
    this.$("body").css("background-size","cover");
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
