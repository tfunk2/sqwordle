<template>
  <container class="stats-chart-container">
    <div class="chart-container">
      <div class="bar-container" id="one-guess-wins">
        <p class="bar-label-text">1</p>
        <div 
          class="win-side-green" 
          :style="`width: ${percentages[0]}%;`" 
        />
        <p class="stat-text-white">{{ fakeStats['one'] }}</p>
      </div>
      <div class="bar-container" id="two-guess-wins">
        <p class="bar-label-text">2</p>
        <div 
          class="win-side-green" 
          :style="`width: ${percentages[1]}%;`" 
        />
        <p class="stat-text-white">{{ fakeStats['two'] }}</p>
      </div>
      <div class="bar-container" id="three-guess-wins">
        <p class="bar-label-text">3</p>
        <div 
          class="win-side-green" 
          :style="`width: ${percentages[2]}%;`" 
        />
        <p class="stat-text-white">{{ fakeStats['three'] }}</p>
      </div>
      <div class="bar-container" id="four-guess-wins">
        <p class="bar-label-text">4</p>
        <div 
          class="win-side-green" 
          :style="`width: ${percentages[3]}%;`" 
        />
        <p class="stat-text-white">{{ fakeStats['four'] }}</p>
      </div>
      <div class="bar-container" id="five-guess-wins">
        <p class="bar-label-text">5</p>
        <div 
          class="win-side-green" 
          :style="`width: ${percentages[4]}%;`" 
        />
        <p class="stat-text-white">{{ fakeStats['five'] }}</p>
      </div>
      <div class="bar-container" id="six-guess-wins">
        <p class="bar-label-text">6</p>
        <div 
          class="win-side-green" 
          :style="`width: ${percentages[5]}%;`" 
        />
        <p class="stat-text-white">{{ fakeStats['six'] }}</p>
      </div>
    </div>
  </container>
</template>

<script lang='ts'>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "StatsChart",
  props: {
    totalWins: {
      type: Number,
      required: true
    },
    highlightedNumber: {
      type: Number,
      required: true,
    }
  },
  setup(props) {
    const fakeStats = {
      'one': 5,
      'two': 12,
      'three': 25,
      'four': 42,
      'five': 56,
      'six': 100
    }

    const percentages = computed(() => {
      const oneGuessWinPercentage = fakeStats['one'] / props.totalWins
      const twoGuessWinPercentage = fakeStats['two'] / props.totalWins
      const threeGuessWinPercentage = fakeStats['three'] / props.totalWins
      const fourGuessWinPercentage = fakeStats['four'] / props.totalWins
      const fiveGuessWinPercentage = fakeStats['five'] / props.totalWins
      const sixGuessWinPercentage = fakeStats['six'] / props.totalWins

      return [
        // Math.round(num * 100) / 100
        Math.round((oneGuessWinPercentage * 10000)) / 100,
        Math.round((twoGuessWinPercentage * 10000)) / 100,
        Math.round((threeGuessWinPercentage * 10000)) / 100,
        Math.round((fourGuessWinPercentage * 10000)) / 100,
        Math.round((fiveGuessWinPercentage * 10000)) / 100,
        Math.round((sixGuessWinPercentage * 10000)) / 100,
      ]
    })

    return {
      fakeStats,
      percentages
    };
  },
});
</script>

<style scoped>
.stats-chart-container {
  height: 70%;
  display: flex;

}

.chart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 30%;
  padding-right: auto;
}

.bar-container {
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 4px;
  height: 10%;
}

.bar-labels-container {
  width: fit-content;
}

.win-side-green {
  background-color: rgb(62, 172, 62);
  height: 100%;
  border-radius: 0px 6px 6px 0px;
  padding-left: 4px;
}

.stat-text-white {
  color: white;
  font-family: 'Bungee Hairline', sans-serif;
  margin: 0;
  padding-left: 4px;
  font-size: 100%;
}

.bar-label {
  display: flex;
  justify-content: end;
  margin-top: 4px;
  padding-right: 6px;
  max-height: 22px;
  min-height: 22px;
}

.bar-label-text {
  font-family: "Monofett", sans-serif;
  color: white;
  margin: 0;
  font-size: 2em;
  line-height: 1;
  padding-left: 6px;
  padding-right: 6px;
  box-shadow: 0 0 0 2px rgb(62, 172, 62) inset;
  border-radius: 6px 0px 0px 6px;
  height: 100%;
}

container {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
