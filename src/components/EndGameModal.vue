<template>
  <div class="modal-container">
    <div class="end-game-modal">
      <h2 class="end-game-reaction">{{ endGameReaction }}</h2>
      <StatsChart 
        :total-wins="240" 
        :highlighted-number="highlightedNumber"
        :is-current-guess-correct="isCurrentGuessCorrect"
      />
      <div v-if="isCurrentGuessCorrect" class="bottom-content">
        <p class="streak-text">Streak increased: <span class="streak-number">{{ winStreak }}</span></p>
        <p class="win-text">
          <span id="winning-word">{{ currentWinningWord.toUpperCase() }}</span>
           was the word
        </p>
      </div>
      <div v-else class="bottom-content">
        <!-- <p class="win-text">Streak dropped to <span class="streak-number">0</span></p> -->
        <p class="win-text">
          <span id="losing-word">{{ currentWinningWord.toUpperCase() }}</span>
          was the word
        </p>
      </div>
      <p class="next-word-button" @click="emitNextWord">NEXT WORD</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType } from "vue";
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
    },
    guessesPerWin: {
      type: Array as PropType<number[]>,
      required: false,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const emitNextWord = (): void => {
      emit("next-word");
    }

    const highlightedNumber = computed(() => {
      return props.guessesPerWin[props.guessesPerWin.length - 1]
    })

    const endGameReaction = computed(() => {
      if (!props.isCurrentGuessCorrect) {
        return 'So close!'
      }

      switch (highlightedNumber.value) {
        case 1:
          return 'Simply Unbelievable!'
        case 2:
          return 'Incredible!'
        case 3:
          return 'Impressive!'
        case 4:
          return 'You did it!'
        case 5:
          return 'Just in time!'
        case 6:
          return 'Phew! That was close.'
        default: 
          return 'Good job!'
      }
    })

    return {
      endGameReaction,
      emitNextWord,
      highlightedNumber
    }
  }
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

.bottom-content{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 30%;
  width: 100%;
}

.end-game-modal {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  height: 50%;
  width: 50%;
  background-color: gray;
  background-image: linear-gradient(to bottom right, black, rgb(30, 30, 30), black);
  cursor: default;
}

.end-game-reaction {
  color: white;
  padding-top: 6px;
  height: fit-content;
  margin: 0;
  font-family: 'Bungee Hairline', sans-serif;
}

.win-text {
  font-family: 'Bungee Hairline', sans-serif;
  color: white;
  font-size: 1.4em;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}

.streak-text {
  font-family: 'Bungee Hairline', sans-serif;
  color: white;
  font-size: 1.4em;
  margin: 0;
}

.streak-number {
  font-family: "Monofett", sans-serif;
  color: rgb(62, 172, 62);
  font-size: 2em;
}

#winning-word {
  font-family: "Monofett", sans-serif;
  color: rgb(62, 172, 62);
  font-size: 2em;
  letter-spacing: 2px;
  line-height: 0.8;
  padding-bottom: 6px;
}

#losing-word {
  font-family: "Monofett", sans-serif;
  color: rgb(214, 40, 40);
  font-size: 2em;
  letter-spacing: 2px;
  line-height: 0.8;
  padding-bottom: 6px;
}

.next-word-button {
  font-family: "Monofett", sans-serif;
  color: white;
  font-size: 2em;
  cursor: pointer;
  margin-top: 0;
}

.next-word-button:hover {
  color: rgb(200, 200, 200);
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
