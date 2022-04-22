<template>
  <q-card flat bordered>
    <temperature-humidity-section scope="env" node="esp01" type="min" />
    <q-separator />
    <temperature-humidity-section scope="env" node="esp01" type="hour" />
    <q-separator />
    <temperature-humidity-section scope="env" node="esp01" type="day" />
  </q-card>
</template>

<script setup lang="ts">
import TemperatureHumiditySection from '@/components/TemperatureHumiditySection.vue'
</script>
