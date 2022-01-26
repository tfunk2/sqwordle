<template>
  <div class="keyboard">
    <div class="keyboard-container">
      <div class="top-row">
        <div
          :class="whichColor(topLetter) + ' grey'"
          v-for="topLetter in topRowKeyboard"
          :key="topLetter"
        >
          {{ topLetter }}
        </div>
      </div>
      <div class="middle-row">
        <div
          :class="whichColor(middleLetter) + ' grey'"
          v-for="middleLetter in middleRowKeyboard"
          :key="middleLetter"
        >
          {{ middleLetter }}
        </div>
      </div>
      <div class="bottom-row">
        <div
          :class="whichColor(bottomLetter) + ' grey'"
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
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Keyboard",
  props: {
    guessedLetters: {
      type: Array as PropType<string[][]>,
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
    whichColor(letter: string): string {
      const letterInstances: string[][] = this.guessedLetters.filter(
        (letterWithColor) => letterWithColor[0] === letter
      );
      const colors: string[] = letterInstances.map(
        (letterWithColor) => letterWithColor[1]
      );
      const greenGuesses: string[] = colors.filter(
        (color) => color === "green"
      );
      const yellowGuesses: string[] = colors.filter(
        (color) => color === "yellow"
      );
      const blackGuesses: string[] = colors.filter(
        (color) => color === "black"
      );
      return greenGuesses.length > 0
        ? "green"
        : yellowGuesses.length > 0
        ? "yellow"
        : blackGuesses.length > 0
        ? "black"
        : "grey";
    },
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

.green {
  background-color: rgb(62, 172, 62);
}

.black {
  background-color: rgb(99, 93, 93);
}

.yellow {
  background-color: rgb(255, 174, 0);
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
