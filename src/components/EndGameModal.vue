<template>
  <div class="modal-container">
    <div class="end-game-modal">
      <StatsChart :total-wins="240"/>
      <div v-if="isCurrentGuessCorrect" class="winning-modal">
        <p>Congrats, {{ currentWinningWord.toUpperCase() }} was the word!</p>
        <p>Streak increased to {{ winStreak }}!</p>
        <button @click="handleWordChange('win')">Next Word</button>
      </div>
      <div v-if="!isCurrentGuessCorrect" class="winning-modal">
        <p>Sorry, {{ currentWinningWord.toUpperCase() }} was the correct word!</p>
        <p>Current streak dropped back to 0</p>
        <button @click="handleWordChange('lose')">Try Again</button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import StatsChart from "./StatsChart.vue"

export default defineComponent({
  name: "EndGameModal",
  components: {
    StatsChart
  },
  props: {
    currentGuess: {
      type: String,
      required: true,
    },
    winStreak: {
      type: Number,
      required: true,
    },
    currentWinningWord: {
      type: String,
      required: true,
    },
    isCurrentGuessCorrect: {
      type: Boolean,
      required: true,
    },
    totalWins: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleWordChange(winOrLose: string): void {
      this.$emit("next-word", winOrLose);
    },
  },
});
</script>

<style scoped>
.modal-container {
  position: absolute;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(50, 50, 50, 0.7)
}

.end-game-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  height: 50%;
  width: 50%;
  background-color: gray;
  background-image: linear-gradient(to bottom right, black, rgb(128, 128, 128))
}

@media screen and (width >= 900px) {
  .grey {
    font-size: 80px;
  }
}

@media screen and (width <= 425px) {
  .end-game-modal {
    height: 70%;
    width: calc(100% - 32px);
  }
}
</style>
