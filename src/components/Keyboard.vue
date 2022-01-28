<template>
  <div class="keyboard">
    <div class="top-row">
      <div
        :class="whichColor(topLetter) + ' grey'"
        v-for="topLetter in topRowKeyboard"
        :key="topLetter"
      >
        {{ topLetter.toUpperCase() }}
      </div>
    </div>
    <div class="middle-row">
      <div
        :class="whichColor(middleLetter) + ' grey'"
        v-for="middleLetter in middleRowKeyboard"
        :key="middleLetter"
      >
        {{ middleLetter.toUpperCase() }}
      </div>
    </div>
    <div class="bottom-row">
      <div
        :class="whichColor(bottomLetter) + ' grey'"
        v-for="bottomLetter in bottomRowKeyboard"
        :key="bottomLetter"
      >
        {{ bottomLetter.toUpperCase() }}
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
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  /* font-family: 'Advent Pro', sans-serif; */
  /* font-family: 'Bungee Hairline', cursive; */
  font-family: "Monofett", cursive;
  font-size: 10vw;
  /* font-size: clamp(2em, 3.5em, 5em); */
  color: rgb(155, 155, 155);
  line-height: 0.7;
  margin: 2px;
}

.green {
  /* background-color: rgb(62, 172, 62); */
  color: rgb(62, 172, 62);
  /* border-radius: 6px; */
}

.black {
  /* background-color: rgb(99, 93, 93); */
  color: rgb(29, 29, 29);
  /* border-radius: 6px; */
}

.yellow {
  /* background-color: rgb(255, 174, 0); */
  color: rgb(255, 174, 0);
  /* border-radius: 6px; */
}

.top-row,
.middle-row,
.bottom-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.keyboard {
  width: 100%;
  justify-self: flex-end;
  margin-bottom: 20px;
  justify-self: flex-end;
  margin-top: auto;
}
</style>
