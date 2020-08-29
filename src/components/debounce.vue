<template>
  <div class="wrapper" v-debounce:scroll.immediate="{cb:increment,wait:100}">
    <div class="box">
      <h1>1</h1>
      <h1>2</h1>
      <h1>4</h1>
      <h1>5</h1>
      <h1>6</h1>
      <h1>7</h1>
      <h1>8</h1>
      <h1>9</h1>
      <h1>0</h1>
      <h1>1</h1>
      <h1>2</h1>
      <h1>4</h1>
      <h1>5</h1>
      <h1>6</h1>
      <h1>7</h1>
      <h1>8</h1>
      <h1>9</h1>
      <h1>0</h1>
      <h1>1</h1>
    </div>
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