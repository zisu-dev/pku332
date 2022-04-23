<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-center">{{ t('realtime-info') }}</div>
      <div v-if="isAdmin" class="text-caption text-center">{{ timestamp }}</div>
    </q-card-section>
    <q-separator />
    <q-card-section v-if="initLoading" class="column items-center">
      <q-spinner-ball color="primary" size="5.5rem" />
      <div class="text-subtitle2 q-pt-md">{{ t('loading') }}</div>
    </q-card-section>
    <q-card-section class="row justify-between q-px-none" v-else>
      <div class="col-grow column items-center">
        <q-knob readonly :min="-20" :max="50" v-model="data!.value.t" show-value size="90px" :color="tColor" track-color="grey-4">
          <code class="text-caption">{{data!.value.t}} °C</code>
        </q-knob>
        <div class="text-subtitle-2">{{ t('temperature') }}</div>
      </div>
      <q-separator vertical />
      <div class="col-grow column items-center">
        <q-knob readonly v-model="data!.value.h" show-value size="90px" :color="hColor" track-color="grey-4">
          <code class="text-caption">{{data!.value.h}} %</code>
        </q-knob>
        <div class="text-subtitle-2">{{ t('humidity') }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { call, isAdmin } from '@/utils/api'

const { t } = useI18n()
const initLoading = ref(true)
const data = ref<{ value: { t: number; h: number }; updated: number }>()
const tColor = computed(() => {
  const t = data.value?.value.t ?? 0
  if (t <= 0) return 'indigo-14'
  if (t <= 15) return 'blue'
  if (t <= 27) return 'green'
  return 'red'
})
const hColor = computed(() => {
  const h = data.value?.value.h ?? 0
  if (h <= 45) return 'blue'
  if (h <= 75) return 'green'
  return 'red'
})
const timestamp = computed(() =>
  data.value ? `${t('updated-time')}: ${new Date(data.value.updated).toLocaleString()}` : `${t('updated-time')}: -`
)

let shouldStop = false
const refresh = async () => {
  if (shouldStop) return
  try {
    data.value = await call('', 'GET', '/public/current_env/esp01')
    initLoading.value = false
  } catch (e) {
    console.log(e)
  }
  setTimeout(refresh, 1000)
}

onBeforeUnmount(() => {
  shouldStop = true
})

onMounted(() => {
  refresh()
})
</script>
