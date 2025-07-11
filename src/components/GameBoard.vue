<template>
  <div class="game-board">
    <div class="guess-container">
      <div v-for="word in usedWords" :key="word" class="word-guess">
        <div
          v-for="(letter, letterIndex) in lettersOfGuess(word)"
          :class="colorsForWord(word, letterIndex) + ' letter'"
          :key="letterIndex"
        >
          {{ letter.toUpperCase() }}
        </div>
      </div>
      <div v-if="!isGuessingComplete" class="word-guess">
        <div
          v-for="(letter, letterIndex) in pendingGuess.split('')"
          class="black letter"
          :key="letterIndex"
        >
          {{ letter.toUpperCase() }}
        </div>
        <div
          v-if="pendingGuess.split('').length < 5"
          class="black letter"
        />
        <div
          v-if="pendingGuess.split('').length < 4"
          class="black letter"
        />
        <div
          v-if="pendingGuess.split('').length < 3"
          class="black letter"
        />
        <div
          v-if="pendingGuess.split('').length < 2"
          class="black letter"
        />
        <div
          v-if="pendingGuess.split('').length < 1"
          class="black letter"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from "vue";
import { isFiveLetterWord } from "../utils/WordChecker";
import {
  fiveLetterWinningWords,
  fiveLetterPlayableWords,
} from "../utils/FiveLetterWords";
// import _ from "lodash";

export default defineComponent({
  name: "GameBoard",
  props: {
    currentGuess: {
      type: String,
      required: true,
    },
    pendingGuess: {
      type: String,
      required: true,
    },
    isGuessingComplete: {
      type: Boolean,
      required: true,
    },
    usedWords: {
      type: Array as PropType<string[]>,
      required: true,
    },
    currentWinningWord: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    isCurrentGuessFiveLetters(): boolean {
      return isFiveLetterWord(this.currentGuess);
    },
    isCurrentGuessInPlayableWordList(): boolean {
      return this.fiveLetterPlayableWordList.includes(this.currentGuess);
    },
    fiveLetterWinningWordList(): string[] {
      return fiveLetterWinningWords
        .sort()
        .map((word: string) => word.toLowerCase());
    },
    fiveLetterPlayableWordList(): string[] {
      return fiveLetterPlayableWords.sort();
    },
    guessesRemaining(): number {
      return 6 - this.usedWords.length;
    },
    isGuessMatchingWinningWord(): boolean {
      return this.currentGuess === this.currentWinningWord;
    },
    styleForGrid(): string {
      let autos = [];
      for (let x = 1; x < this.usedWords.length; x++) {
        autos.push("auto");
      }
      return autos.join(" ")
    }
  },
  methods: {
    colorsForWord(word: string, letterIndex: number): string {
      const guessedLetters: string[] = this.lettersOfGuess(word);
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
    lettersOfGuess(word: string): string[] {
      return word.split("");
    },
  },
});
</script>

<style scoped>
.game-board {
  position: relative;
  justify-self: flex-start;
  z-index: 99;
}

.guess-container {
  width: fit-content;
  height: fit-content;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  column-gap: 10px;
  row-gap: 15px;
  background-color: black;
  padding: 12px;
  padding-bottom: 16px;
}

#pending-guess-container {
  height: 100%;
  width: fit-content;
  max-width: 328px;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  padding: 2px 4px;
}

.word-guess {
  height: 100%;
  width: fit-content;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  padding: 2px 4px;
}

.letter {
  width: 1em;
  height: 1em;
  margin: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bolder;
  border-radius: 2px;
  font-family: "Bungee Hairline", cursive;
  font-size: 3.5em;
  line-height: 0.5;
}

.green {
  background-color: rgb(62, 172, 62);
}

.black {
  background-color: rgb(99, 93, 93);
}

.yellow {
  background-color: rgb(255, 174, 0);
}
</style>
