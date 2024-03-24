<script setup lang="ts">
defineProps<{
  wordOfTheDay: string
}>()

import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '../settings'
</script>

<template>
  <input type="text"/>
  <p>{{ VICTORY_MESSAGE }}</p>
  <p>{{ DEFEAT_MESSAGE }}</p>
</template>
