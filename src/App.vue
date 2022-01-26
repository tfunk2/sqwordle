<template>
  <div class="app-container">
    <form @submit.prevent>
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
      </div>
      <input
        class="button"
        type="submit"
        value="Submit Answer"
        @click="setCurrentGuess"
        ref="submit"
      />
    </form>
    <p>isWordValid: {{ isWordValid }}</p>
    <p>randomIndex: {{ randomIndex }}</p>
    <p>usedWords: {{ usedWords }}</p>
    <p>pendingGuess: {{ pendingGuess }}</p>
    <p>currentGuess: {{ currentGuess }}</p>
    <p>currentWinningWord: {{ currentWinningWord }}</p>
    <GameBoard
      :currentWinningWord="currentWinningWord"
      :currentGuess="currentGuess"
      :usedWords="usedWords"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import GameBoard from "./components/GameBoard.vue";
import {
  fiveLetterWinningWords,
  // fiveLetterPlayableWords,
} from "./utils/FiveLetterWords";
import { isFiveLetterWord, isWordPlayable } from "./utils/WordChecker";

export default defineComponent({
  name: "App",
  components: {
    GameBoard,
  },
  data() {
    return {
      usedWords: [] as Array<String>,
      pendingGuess: "",
      currentGuess: "",
      // currentWinningWord: "",
      // letter1: "",
      // letter2: "",
      // letter3: "",
      // letter4: "",
      // letter5: "",
      // inputRecentlyChanged: "",
    };
  },
  computed: {
    // colorsForGuess(): string[] {
    //   const guessedLetters: string[] = this.currentGuess.split("");
    //   const winningLetters: string[] = this.currentWinningWord.split("");
    //   if (this.currentGuess === "") {
    //     return [];
    //   }
    //   return guessedLetters.map((letter, index) => {
    //     return letter === winningLetters[index]
    //       ? "green"
    //       : winningLetters.includes(letter)
    //       ? "yellow"
    //       : "black";
    //   });
    // },
    isWordValid(): boolean {
      return (
        isFiveLetterWord(this.pendingGuess) &&
        isWordPlayable(this.pendingGuess) &&
        !this.usedWords.includes(this.pendingGuess)
      );
    },
    isGuessingComplete(): boolean {
      return this.usedWords.length === 6;
    },
    isCurrentGuessCorrect(): boolean {
      return this.currentGuess.toLowerCase() === this.currentWinningWord;
    },
    // previousGuess(): string {
    //   if (this.usedWords.length > 0) {
    //     return this.usedWords[this.usedWords.length - 1];
    //   }
    //   return "";
    // },
    // pendingGuess(): string {
    //   return [
    //     this.letter1,
    //     this.letter2,
    //     this.letter3,
    //     this.letter4,
    //     this.letter5,
    //   ].join("");
    // },
  },
  methods: {
    setCurrentGuess(): void {
      if (this.isWordValid) {
        this.currentGuess = this.pendingGuess;
        this.usedWords = [...this.usedWords, this.pendingGuess];
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

<style>
#app {
  width: 100%;
  height: 100%;
}

.app-container {
  max-width: 95%;
}

.letter-input {
  max-width: 19%;
}

.letter-input-container {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
}
</style>
