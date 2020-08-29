<template>
  <div id="app">
    <h1>hello world</h1>
    <Test></Test>
    <!-- <Debounce></Debounce> -->
    <Throttle></Throttle>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */

// import HelloWorld from './components/HelloWorld.vue'
import Test from './components/test'
import Debounce from './components/debounce'
import Throttle from './components/throttle'
export default {
  name: 'App',
  components: {
    // HelloWorld
    Test,
    Debounce,
    Throttle
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
