<template>
  <div class="app-container">
    <Header />

    <SessionStats 
      :win-streak="winStreak"
    />
    <div>
      <form @submit.prevent autocomplete="off" class="guess-form">
        <div class="letter-input-container">
          <input
            class="five-letter-input"
            id="pending-guess"
            v-model="pendingGuess"
            maxlength="5"
            minlength="1"
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
        :shake-word-guess="shakeWordGuess"
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
    <Keyboard 
      :guessed-letters="guessedLetters" 
      @type-letter="typeLetter($event)"
      @backspace="backspace"
      @submit-guess="setCurrentGuess"
    />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from "vue";
import EndGameModal from "./components/EndGameModal.vue";
import SessionStats from "./components/SessionStats.vue";
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
    SessionStats
  },
  setup() {
    const pendingGuess: Ref<string> = ref("");
    const usedWords: Ref<string[]> = ref([]);
    const currentGuess: Ref<string> = ref("");
    const guessedLetters: Ref<string[][]> = ref([]);
    const winStreak: Ref<number> = ref(0);
    const longestStreak: Ref<number> = ref(0);
    const winPercent: Ref<number> = ref(0);
    const totalWins: Ref<number> = ref(0);
    const totalLosses: Ref<number> = ref(0);

    const shakeWordGuess = ref(false);

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

    const updateUsedWords = (incomingWord: string, clearUsedWords: boolean = false) => {
      const currentSession = localStorage.getItem('currentSession') || '{}'
      const parsedSession = JSON.parse(currentSession)
      const updatedSessionObj = {...parsedSession}
      if (clearUsedWords) {
        updatedSessionObj.usedWords = []
        localStorage.setItem('currentSession', updatedSessionObj)
      } else {
        updatedSessionObj.usedWords = [...updatedSessionObj.usedWords, incomingWord]
        localStorage.setItem('currentSession', JSON.stringify(updatedSessionObj))
      }
    }

    const updateCache = (updateKey: string, updateValue: string|number|null = null) => {
      const currentSession = localStorage.getItem('currentSession') || '{}'
      const parsedSession = JSON.parse(currentSession)
      const updatedSessionObj = {...parsedSession}

      switch (updateKey) {
        case "pendingGuess":
          // If less than 5 chars, add letter to pending guess
          if (pendingGuess.value.length < 5) {
            updatedSessionObj[updateKey] = parsedSession[updateKey] + updateValue
          }
          break;
        case "usedWords":
          // Add used word to cache
          updatedSessionObj[updateKey] = [...parsedSession[updateKey], updateValue]
          break;
        case "guessedLetters":
          updatedSessionObj[updateKey] = updateValue
          break;
        case "winStreak":
          // Clear winStreak or add 1
          if (updateValue === 'clear') {
            updatedSessionObj[updateKey] = 0
          } else {
            updatedSessionObj[updateKey] = updatedSessionObj[updateKey] + 1
          }
          break;
        case "longestStreak":
          updatedSessionObj[updateKey] = updateValue
          break;
        case "totalWins":
          updatedSessionObj[updateKey] = updateValue
          break;
        case "totalLosses":
          updatedSessionObj[updateKey] = updateValue
          break;
          default:
            console.log('Something went wrong with updating cache')
      }

      localStorage.setItem('currentSession', JSON.stringify(updatedSessionObj))
    }

    const typeLetter = (letter: string) => {
      if (pendingGuess.value.length < 5) {
        pendingGuess.value = pendingGuess.value + letter
      }
    }

    const backspace = () => {
      if (pendingGuess.value.length) {
        pendingGuess.value = pendingGuess.value.slice(0, -1)
      }
    }

    const setCurrentGuess = (): void => {
      if (isWordValid.value) {
        currentGuess.value = pendingGuess.value.toLowerCase();
        usedWords.value = [...usedWords.value, pendingGuess.value.toLowerCase()];
        guessedLetters.value = usedWords.value
          .map((usedWord) => {
            return usedWord.split("").map((letter, letterIndex) => {
              return [letter, colorsForWord(usedWord, letterIndex)];
            });
          })
          .flat();
        if (isCurrentGuessCorrect.value) {
          winStreak.value = winStreak.value + 1;
        }
        pendingGuess.value = "";
        updateUsedWords(currentGuess.value, false);
      } else {
        shakeWordGuess.value = true;
        setTimeout(() => {
          shakeWordGuess.value = false;
        }, 500)
      }
    }

    const setNewWinningWord = (): void => {
      const randomIndex = Math.random() * fiveLetterWinningWords.length;
      currentWinningWord.value = fiveLetterWinningWords[randomIndex];
    }

    const colorsForWord = (word: string, letterIndex: number): string => {
      const guessedLetters: string[] = word.split("");
      const winningLetters: string[] = currentWinningWord.value.split("");
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
    }

    const changeWordClearBoard = (winOrLose: string): void => {
      pendingGuess.value = "";

      usedWords.value = [];
      const randomIndex: number =
        Math.floor(Math.random() * fiveLetterWinningWords.length) + 1;
      currentWinningWord.value = ref(fiveLetterWinningWords[randomIndex]);
      currentGuess.value = "";
      guessedLetters.value = [];
      if (winOrLose === "lose") {
        winStreak.value = 0;
      }
      setInputFocus()
    }

    const isWordValid: ComputedRef<boolean> = computed(() => {
      return (
        isFiveLetterWord(pendingGuess.value.toLowerCase()) &&
        isWordPlayable(pendingGuess.value.toLowerCase()) &&
        !usedWords.value.includes(pendingGuess.value.toLowerCase())
      );
    })

    const isGuessingComplete: ComputedRef<boolean> = computed(() => {
      return usedWords.value.length === 6 || isCurrentGuessCorrect.value;
    })

    const isCurrentGuessCorrect: ComputedRef<boolean> = computed(() => {
      return currentGuess.value.toLowerCase() === currentWinningWord.value;
    })

    return {
      backspace,
      shakeWordGuess,
      updateCache,
      typeLetter,
      setCurrentGuess,
      setNewWinningWord,
      changeWordClearBoard,
      isCurrentGuessCorrect,
      isGuessingComplete,
      usedWords,
      pendingGuess,
      currentGuess,
      guessedLetters,
      isWordValid,
      longestStreak,
      totalWins,
      totalLosses,
      winPercent,
      winStreak,
      randomIndex,
      currentWinningWord,
      setInputFocus,
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
    // Retrieving data
    const currentSession: any = localStorage.getItem('currentSession');
    const parsedSession = JSON.parse(currentSession);

    if (!parsedSession) {
      // Saving data
      localStorage.setItem('currentSession', JSON.stringify({
        pendingGuess: '',
        usedWords: [],
        guessedLetters: [],
        winStreak: 0,
        longestStreak: 0,
        currentWinningWord: '',
        totalWins: 0,
        totalLosses: 0,
      }));
    } else {
      console.log('parsedSession', parsedSession)
      this.pendingGuess = parsedSession.pendingGuess
      this.usedWords = parsedSession.usedWords
      this.guessedLetters = parsedSession.guessedLetters
      this.winStreak = parsedSession.winStreak
      this.longestStreak = parsedSession.longestStreak
      this.totalWins = parsedSession.totalWins
      this.totalLosses = parsedSession.totalLosses
      // currentWinningWord.value = parsedSession.currentWinningWord
    }
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
</style>
