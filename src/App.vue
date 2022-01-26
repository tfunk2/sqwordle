<template>
  <div class="app-container">
    <Header />
    <form @submit.prevent autocomplete="off">
      <div class="letter-input-container">
        <input
          class="five-letter-input"
          id="pending-guess-2"
          v-model="pendingGuess"
          maxlength="5"
          minlength="5"
          :disabled="isGuessingComplete"
          oninvalid="setCustomValidity('Make sure to use a valid 5 letter word')"
        />
        <input
          v-if="!isGuessingComplete"
          class="button"
          type="submit"
          value="Enter"
          @click="setCurrentGuess"
          ref="submit"
        />
      </div>
    </form>
    <GameBoard
      :current-winning-word="currentWinningWord"
      :current-guess="currentGuess"
      :used-words="usedWords"
    />
    <Keyboard :guessed-letters="guessedLetters" />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import GameBoard from "./components/GameBoard.vue";
import Header from "./components/Header.vue";
import Keyboard from "./components/Keyboard.vue";
import { fiveLetterWinningWords } from "./utils/FiveLetterWords";
import { isFiveLetterWord, isWordPlayable } from "./utils/WordChecker";
const _ = require("lodash");

export default defineComponent({
  name: "App",
  components: {
    GameBoard,
    Header,
    Keyboard,
  },
  data() {
    const pendingGuess: string = "";
    const usedWords: string[] = [];
    const currentGuess: string = "";
    const guessedLetters: string[] = [];

    return {
      usedWords,
      pendingGuess,
      currentGuess,
      guessedLetters,
    };
  },
  computed: {
    isWordValid(): boolean {
      return (
        isFiveLetterWord(this.pendingGuess) &&
        isWordPlayable(this.pendingGuess) &&
        !this.usedWords.includes(this.pendingGuess)
      );
    },
    isGuessingComplete(): boolean {
      return this.usedWords.length === 6 || this.isCurrentGuessCorrect;
    },
    isCurrentGuessCorrect(): boolean {
      return this.currentGuess.toLowerCase() === this.currentWinningWord;
    },
  },
  methods: {
    setCurrentGuess(): void {
      if (this.isWordValid) {
        this.currentGuess = this.pendingGuess;
        this.usedWords = [...this.usedWords, this.pendingGuess];
        this.guessedLetters = _.uniq([
          ...this.guessedLetters,
          ...this.pendingGuess.split(""),
        ]);
        this.pendingGuess = "";
      }
    },
    setNewWinningWord(): void {
      const randomIndex = Math.random() * fiveLetterWinningWords.length;
      this.currentWinningWord = fiveLetterWinningWords[randomIndex];
    },
  },
  setup() {
    const randomIndex: number =
      Math.floor(Math.random() * fiveLetterWinningWords.length) + 1;
    const currentWinningWord: Ref = ref(fiveLetterWinningWords[randomIndex]);
    return {
      randomIndex,
      currentWinningWord,
    };
  },
});
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}

.app-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 95%;
}

.letter-input {
  max-width: 19%;
}

.letter-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
}
</style>
