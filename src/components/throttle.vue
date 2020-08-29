<template>
  <div class="wrapper">
    <!-- <div v-throttle="increment">你好</div> -->
    <!-- <div v-throttle="()=>increment(1,2)"></div> -->
    <div v-throttle="{cb:()=>{ increment(1,2) },leading:false,wait:100}">你好</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
      timer: null,
    };
  },
  methods: {
    increment() {
      console.log(this.count);
      this.count++;
    },
  },
};
</script>
<style scoped>
.wrapper {
  width: 400px;
  height: 200px;
  overflow: auto;
}

.box {
  width: 100%;
  height: 10000px;
  background-color: #fafafa;
}
</style>