<template>
  <div class="game-board">
    <div class="guess-container">

      <!-- PREVIOUSLY GUESSED WORD ROWS -->
      <div v-if="usedWords.length > 0">
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

      <!-- CURRENT GUESSING ROW -->
      <div 
        v-if="!isGuessingComplete" 
        :class="{'word-guess': true, 'animate__animated animate__headShake': shakeInvalid}"
      >
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

      <!-- EMPTY ROWS -->
       <div v-if="usedWords.length < 5">
         <div 
           v-for="row in (5 - usedWords.length)"
           :key="row"
           class="word-guess"
         >
           <div
             v-for="index in 5"
             :key="index"
             class="black letter"
           />
         </div>
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
    shakeWordGuess: {
      type: Boolean,
      default: false
    }
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
    },
    shakeInvalid() {
      return this.shakeWordGuess
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
  height: 405px;
  display: flex;
  flex-direction: column;
  grid-template-columns: auto;
  grid-template-rows: auto;
  background-color: black;
  padding: 12px;
  padding-bottom: 16px;
  border-radius: 6px;
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
  height: fit-content;
  width: fit-content;
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
  font-family: "Bungee Hairline", sans-serif;
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
