<script setup lang="ts">
import { DEFEAT_MESSAGE, VICTORY_MESSAGE, WORD_SIZE } from "@/settings"
import englishWords from "@/englishWordsWith5Letters.json"
import { ref } from "vue"
import GuessInput from "@/components/GuessInput.vue"

defineProps({
  wordOfTheDay: {
    type: String,
    required: true,
    validator: (wordGiven: string) => englishWords.includes(wordGiven)
  }
})

const guessesSubmitted = ref<string[]>([])

</script>

<template>
  <main>
    <GuessInput @guess-submitted="(guess: string) => guessesSubmitted.push(guess)" />
    <p
      class="end-of-game-message"
      v-if="guessesSubmitted.length === 6 || guessesSubmitted.includes(wordOfTheDay)"
      v-text="guessesSubmitted.includes(wordOfTheDay) ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
    />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
}

.end-of-game-message {
  font-size: 3rem;
  animation: end-of-game-message-animation 700ms forwards;
  white-space: nowrap;
  text-align: center;
}

@keyframes end-of-game-message-animation {
  0% {
    opacity: 0;
    transform: rotateZ(0);
  }

  100% {
    opacity: 1;
    transform: translateY(2rem);
  }
}
</style>