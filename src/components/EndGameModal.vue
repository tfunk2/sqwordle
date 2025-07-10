<template>
  <div class="end-game-modal">
    <div v-if="isCurrentGuessCorrect" class="winning-modal">
      <!-- <p>Congrats, {{ currentWinningWord.toUpperCase() }} was the word!</p>
      <p>Streak increased to {{ winStreak }}!</p> -->
      <button @click="handleWordChange('win')">Next Word</button>
    </div>
    <div v-if="!isCurrentGuessCorrect" class="winning-modal">
      <!-- <p>Sorry, {{ currentWinningWord.toUpperCase() }} was the correct word!</p>
      <p>Streak dropped back to 0 :(</p> -->
      <button @click="handleWordChange('lose')">Try Again</button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EndGameModal",
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
</style>
