<template>
  <div class="app-container">
    <Header />
    <div id="streak-container">
      <p id="streak-text">STREAK</p>
      <b id="streak-number-text">{{ winStreak }}</b>
    </div>
    <div>
      <form @submit.prevent autocomplete="off" class="guess-form">
        <div class="letter-input-container">
          <input
            class="five-letter-input"
            id="pending-guess"
            v-model="pendingGuess"
            maxlength="5"
            minlength="5"
            :disabled="isGuessingComplete"
            oninvalid="setCustomValidity('Make sure to use a valid 5 letter word')"
            autofocus
          />
          <input
            v-show="!isGuessingComplete"
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
        :is-guessing-complete="isGuessingComplete"
        :pending-guess="pendingGuess"
      />
    </div>
    <EndGameModal
      v-if="isGuessingComplete"
      :currentGuess="currentGuess"
      :winStreak="winStreak"
      :currentWinningWord="currentWinningWord"
      :isCurrentGuessCorrect="isCurrentGuessCorrect"
      @next-word="changeWordClearBoard($event)"
    />
    <Keyboard :guessed-letters="guessedLetters" />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import EndGameModal from "./components/EndGameModal.vue";
import GameBoard from "./components/GameBoard.vue";
import Header from "./components/Header.vue";
import Keyboard from "./components/Keyboard.vue";
import { fiveLetterWinningWords } from "./utils/FiveLetterWords";
import { isFiveLetterWord, isWordPlayable } from "./utils/WordChecker";
// const _ = require("lodash");

export default defineComponent({
  name: "App",
  components: {
    EndGameModal,
    GameBoard,
    Header,
    Keyboard,
  },
  data() {
    const pendingGuess: string = "";
    const usedWords: string[] = [];
    const currentGuess: string = "";
    const guessedLetters: string[][] = [];
    const winStreak: number = 0;

    return {
      usedWords,
      pendingGuess,
      currentGuess,
      guessedLetters,
      winStreak,
    };
  },
  computed: {
    isWordValid(): boolean {
      return (
        isFiveLetterWord(this.pendingGuess.toLowerCase()) &&
        isWordPlayable(this.pendingGuess.toLowerCase()) &&
        !this.usedWords.includes(this.pendingGuess.toLowerCase())
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
        this.currentGuess = this.pendingGuess.toLowerCase();
        this.usedWords = [...this.usedWords, this.pendingGuess.toLowerCase()];
        this.guessedLetters = this.usedWords
          .map((usedWord) => {
            return usedWord.split("").map((letter, letterIndex) => {
              return [letter, this.colorsForWord(usedWord, letterIndex)];
            });
          })
          .flat();
        if (this.isCurrentGuessCorrect) {
          this.winStreak = this.winStreak + 1;
        }
        this.pendingGuess = "";
      }
    },
    setNewWinningWord(): void {
      const randomIndex = Math.random() * fiveLetterWinningWords.length;
      this.currentWinningWord = fiveLetterWinningWords[randomIndex];
    },
    colorsForWord(word: string, letterIndex: number): string {
      const guessedLetters: string[] = word.split("");
      const winningLetters: string[] = this.currentWinningWord.split("");
      if (word === "") {
        return "";
      }
      return guessedLetters.map((letter, index) => {
        return letter === winningLetters[index]
          ? "green"
          : winningLetters.includes(letter)
          ? "yellow"
          : "black";
      })[letterIndex];
    },
    changeWordClearBoard(winOrLose: string): void {
      this.pendingGuess = "";
      this.usedWords = [];
      const randomIndex: number =
        Math.floor(Math.random() * fiveLetterWinningWords.length) + 1;
      this.currentWinningWord = ref(fiveLetterWinningWords[randomIndex]);
      this.currentGuess = "";
      this.guessedLetters = [];
      if (winOrLose === "lose") {
        this.winStreak = 0;
      }
      this.setInputFocus()
    },
  },
  setup() {
    const randomIndex: number =
      Math.floor(Math.random() * fiveLetterWinningWords.length) + 1;
    const currentWinningWord: Ref = ref(fiveLetterWinningWords[randomIndex]);
    const setInputFocus = () => {
      const inputField = document.getElementById("pending-guess");

      if (inputField) {
        // Set initial focus (can also be done with autofocus attribute)
        inputField.focus();
        
        // Re-focus the input field whenever it loses focus
        inputField.addEventListener("blur", function() {
          inputField.focus();
        });
      }
    }

    return {
      randomIndex,
      currentWinningWord,
      setInputFocus
    };
  },
  mounted() {
    document.addEventListener("DOMContentLoaded", () => {
      const inputField = document.getElementById("pending-guess");
      const body = document.getElementsByTagName('body')

      if (inputField) {
        // Set initial focus (can also be done with autofocus attribute)
        inputField.focus();
        
        // Re-focus the input field whenever it loses focus
        inputField.addEventListener("blur", function() {
          inputField.focus();
        });
        
        body[0].addEventListener("click", function() {
          inputField.focus();
        });
      }
    });
  },
});
</script>

<style>
#app {
  height: 100vh;
  min-width: 100%;
  min-height: 100%;
}

#pending-guess {
  outline: none;
  background-color: transparent;
}

.guess-form {
  justify-self: flex-start;
  position: absolute;
  z-index: 1;
}

.app-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  height: 100%;
}

.letter-input {
  max-width: 19%;
}

.letter-input-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  z-index: 1;
}

#streak-text {
  color: white;
  font-family: "Bungee Hairline", cursive;
  margin-bottom: 0px;
}

#streak-number-text {
  color: white;
  font-family: "Bungee Hairline", cursive;
  font-size: 24px;
  margin-top: 0px;
}

#streak-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
