<template>
  <div class="header">
    <h1 class="header-title">SQWORDLE</h1>
  </div>
</template>

<script lang='ts'>
export default {
  name: "Header",
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.header {
  background-color: rgb(62, 172, 62);
  color: white;
  width: 100%;
  text-align: center;
}

.header-title {
  /* font-family: 'Advent Pro', sans-serif; */
  /* font-family: 'Bungee Hairline', sans-serif; */
  font-family: "Monofett", sans-serif;
  font-size: 3.5em;
  line-height: 0.7;
  margin-top: 0.2em;
  margin-bottom: 0.3em;
}
</style>
