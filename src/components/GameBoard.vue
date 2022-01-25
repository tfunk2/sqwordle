<template>
  <div class="game-board">
    <h1>This is the game board</h1>
    <p>Five Letter Word? -->{{ isCurrentGuessFiveLetters }}</p>
  </div>
</template>

<script>
import { isFiveLetterWord } from "../utils/WordChecker.js";

export default {
  name: "GameBoard",
  props: {
    currentGuess: String,
  },
  computed: {
    isCurrentGuessFiveLetters() {
      return isFiveLetterWord(this.currentGuess);
    },
  },
};
</script>

<style scoped>
</style>
