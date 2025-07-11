<template>
  <section class="stats-section">
    <div id="stats-container">
      <p id="streak-text">CURRENT</p>
      <p id="streak-text">STREAK</p>
      <b id="streak-number-text">{{ winStreak }}</b>
    </div>
    <div id="stats-container">
      <p id="streak-text">WIN</p>
      <p id="streak-text">PERCENT</p>
      <b id="streak-number-text">{{ winStreak }}</b>
    </div>
    <div id="stats-container">
      <p id="streak-text">LONGEST</p>
      <p id="streak-text">STREAK</p>
      <b id="streak-number-text">{{ winStreak }}</b>
    </div>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SessionStats",
  props: {
    winStreak: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
});
</script>

<style scoped>
#streak-text {
  color: white;
  font-family: "Bungee Hairline", cursive;
  margin: 0px;
  line-height: 0.8;
  padding-bottom: 4px;
}

#streak-number-text {
  color: white;
  font-family: "Bungee Hairline", cursive;
  font-size: 36px;
  margin-top: 0px;
  line-height: 0.7
}

#stats-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  outline: 1px white solid;
  padding-top: 12px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 10px;
}

.stats-section {
  display: flex;
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
