<template>
  <div class="keyboard">
    <div class="keyboard-container">
      <div class="top-row">
        <!-- :class="whichColor(topLetter) + ' grey'" -->
        <div class="grey" v-for="topLetter in topRowKeyboard" :key="topLetter">
          {{ topLetter }}
        </div>
      </div>
      <div class="middle-row">
        <!-- :class="whichColor(middleLetter) + ' grey'" -->
        <div
          class="grey"
          v-for="middleLetter in middleRowKeyboard"
          :key="middleLetter"
        >
          {{ middleLetter }}
        </div>
      </div>
      <div class="bottom-row">
        <!-- :class="whichColor(bottomLetter) + ' grey'" -->
        <div
          class="grey"
          v-for="bottomLetter in bottomRowKeyboard"
          :key="bottomLetter"
        >
          {{ bottomLetter }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Keyboard",
  props: {
    guessedLetters: {
      type: [String],
      required: true,
    },
  },
  data() {
    const topRowKeyboard: string[] = "qwertyuiop".split("");
    const middleRowKeyboard: string[] = "asdfghjkl".split("");
    const bottomRowKeyboard: string[] = "zxcvbnm".split("");
    return {
      topRowKeyboard,
      middleRowKeyboard,
      bottomRowKeyboard,
    };
  },
  computed: {},
  methods: {
    // whichColor(letter: string): string {
    //   return
    // },
  },
});
</script>

<style scoped>
.grey {
  margin: 4px;
  background-color: lightgray;
  width: 2em;
  height: 2em;
  grid-area: letter;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
}

.top-row,
.middle-row,
.bottom-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.keyboard-container {
  width: 100%;
}

.keyboard {
  width: 100%;
}
</style>
