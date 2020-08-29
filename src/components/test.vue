<template>
  <div>
    <!-- <div v-debounce="increment"></div> -->
    <div v-debounce:dblclick="{cb:()=>{ increment(1,2) },wait:1000}"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
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
div {
  width: 400px;
  height: 400px;
  background-color: #eeeeee;
}
</style>