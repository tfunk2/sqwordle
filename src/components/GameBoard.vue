<template>
  <div class="game-board">
    <p>Guesses Remaining: {{ guessesRemaining }}</p>
    <p>Current Guess --> {{ currentGuess }}</p>
    <p>Is Current Guess Playable? --> {{ isCurrentGuessInPlayableWordList }}</p>
    <div v-if="usedWords.length" class="guess-container">
      <div v-for="word in usedWords" :key="word" class="word-guess">
        <div
          v-for="(letter, letterIndex) in lettersOfGuess(word)"
          :class="colorsForWord(word, letterIndex) + ' letter'"
          :key="letterIndex"
        >
          {{ letter.toUpperCase() }}
        </div>
      </div>
    </div>
    <p>colorsForWord: {{ colorsForWord(currentGuess) }}</p>
  </div>
</template>

<script lang='ts'>
import { isFiveLetterWord } from "../utils/WordChecker";
import {
  fiveLetterWinningWords,
  fiveLetterPlayableWords,
} from "../utils/FiveLetterWords";
import _ from "lodash";

export default {
  name: "GameBoard",
  props: {
    currentGuess: String,
    usedWords: [String],
    currentWinningWord: String,
  },
  data() {
    return {};
  },
  computed: {
    isCurrentGuessFiveLetters() {
      return isFiveLetterWord(this.currentGuess);
    },
    isCurrentGuessInPlayableWordList() {
      return this.fiveLetterPlayableWordList.includes(this.currentGuess);
    },
    fiveLetterWinningWordList() {
      return _.uniq(fiveLetterWinningWords.sort()).map((word) =>
        word.toLowerCase()
      );
    },
    fiveLetterPlayableWordList() {
      return _.uniq(fiveLetterPlayableWords.sort());
    },
    guessesRemaining(): number {
      return 6 - this.usedWords.length;
    },
  },
  methods: {
    colorsForWord(word: string, letterIndex: string): string[] {
      const guessedLetters: string[] = this.lettersOfGuess(word);
      const winningLetters: string[] = this.currentWinningWord.split("");
      if (word === "") {
        return [];
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
};
</script>

<style scoped>
.guess-container {
  width: fit-content;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto auto auto auto;
  column-gap: 10px;
  row-gap: 15px;
  background-color: black;
  padding: 12px;
}

.word-guess {
  height: 100%;
  width: fit-content;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
}

.letter {
  width: 2em;
  height: 2em;
  margin: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bolder;
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
