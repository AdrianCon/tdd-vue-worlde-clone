<script setup lang="ts">
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '../settings'
import { ref } from 'vue'

defineProps({
  wordOfTheDay: {
    type: String,
    required: true,
    validator: (value: string) => value.length === 5
  }
})

const guessInProgress = ref("")
const guessSubmitted = ref("")
</script>

<template>
  <input type="text" v-model="guessInProgress" @keydown.enter="guessSubmitted = guessInProgress"/>
  <p 
    v-if="guessSubmitted.length > 0"
    v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
  />
</template>
