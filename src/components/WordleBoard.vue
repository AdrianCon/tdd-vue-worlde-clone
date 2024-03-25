<script setup lang="ts">
import { VICTORY_MESSAGE, DEFEAT_MESSAGE, WORD_SIZE } from '../settings'
import englishWords from '@/englishWordsWith5Letters.json'
import { ref, computed } from 'vue'

defineProps({
  wordOfTheDay: {
    type: String,
    required: true,
    validator: (value: string) => englishWords.includes(value)
  }
})

const guessInProgress = ref("")
const guessSubmitted = ref("")

const formattedGuessInProgress = computed({
  get: () => guessInProgress.value,
  set: (rawValue: string) => guessInProgress.value = rawValue.slice(0,WORD_SIZE)
})

function onSubmit() {
  if(!englishWords.includes(guessInProgress.value)) return
  guessSubmitted.value = guessInProgress.value
}
</script>

<template>
  <input
    type="text"
    :maxlength="WORD_SIZE"
    v-model="formattedGuessInProgress"
    @keydown.enter="onSubmit" 
  />
  <p v-if="guessSubmitted.length > 0" v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE" />
</template>
