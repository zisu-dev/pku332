<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Debug: Door</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="text-subtitle-1">Open door arguments</div>
    </q-card-section>
    <q-card-section class="row q-gutter-sm items-center q-py-none">
      <q-btn outline label="Add Stage" @click="openStages.push({ speed: 1500, ms: 100 })" />
      <q-btn outline label="Remove Stage" @click="openStages.pop()" />
      <async-btn ref="fetchOpenBtnRef" :btn-props="{ outline: true, label: 'Fetch' }" :callback="loadOpenArgs" notify-success />
      <async-btn :btn-props="{ outline: true, label: 'Save' }" :callback="saveOpenArgs" notify-success />
      <async-btn :btn-props="{ color: 'primary', label: t('open-door') }" :callback="dispatchOpen" notify-success />
    </q-card-section>
    <q-card-section class="row">
      <div v-for="(stage, i) of openStages" class="q-pa-xs">
        <q-card flat bordered>
          <q-card-section class="q-pb-none">
            <div class="text-caption">Stage {{ i }}:</div>
          </q-card-section>
          <q-card-section class="row q-gutter-sm items-center q-pt-none">
            <q-input v-model.number="stage.speed" label="speed" type="number" />
            <q-input v-model.number="stage.ms" label="ms" type="number" />
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="text-subtitle-1">Close door arguments</div>
    </q-card-section>
    <q-card-section class="row q-gutter-sm items-center q-py-none">
      <q-btn outline label="Add Stage" @click="closeStages.push({ speed: 1500, ms: 100 })" />
      <q-btn outline label="Remove Stage" @click="closeStages.pop()" />
      <async-btn ref="fetchCloseBtnRef" :btn-props="{ outline: true, label: 'Fetch' }" :callback="loadCloseArgs" notify-success />
      <async-btn :btn-props="{ outline: true, label: 'Save' }" :callback="saveCloseArgs" notify-success />
      <async-btn :btn-props="{ color: 'primary', label: t('close-door') }" :callback="dispatchClose" notify-success />
    </q-card-section>
    <q-card-section class="row">
      <div v-for="(stage, i) of closeStages" class="q-pa-xs">
        <q-card flat bordered>
          <q-card-section class="q-pb-none">
            <div class="text-caption">Stage {{ i }}:</div>
          </q-card-section>
          <q-card-section class="row q-gutter-sm items-center q-pt-none">
            <q-input v-model.number="stage.speed" label="speed" type="number" />
            <q-input v-model.number="stage.ms" label="ms" type="number" />
          </q-card-section>
        </q-card>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { adminCall, userAction } from '@/utils/api'
import AsyncBtn from '@/components/AsyncBtn.vue'

const { t } = useI18n()
const openStages = ref<{ speed: number; ms: number }[]>([])
const closeStages = ref<{ speed: number; ms: number }[]>([])

const fetchOpenBtnRef = ref<InstanceType<typeof AsyncBtn> | null>(null)
const fetchCloseBtnRef = ref<InstanceType<typeof AsyncBtn> | null>(null)

const loadOpenArgs = async () => {
  openStages.value = await adminCall('GET', '/open_door_args')
}

const loadCloseArgs = async () => {
  closeStages.value = await adminCall('GET', '/close_door_args')
}

const saveOpenArgs = async () => {
  await adminCall('POST', '/open_door_args', { args: openStages.value })
}

const saveCloseArgs = async () => {
  await adminCall('POST', '/close_door_args', { args: closeStages.value })
}

const dispatchOpen = async () => {
  await userAction('servo_run_seq', 'esp01', {
    stages: openStages.value
  })
}

const dispatchClose = async () => {
  await userAction('servo_run_seq', 'esp01', {
    stages: closeStages.value
  })
}

onMounted(() => {
  fetchOpenBtnRef.value?.dispatch()
  fetchCloseBtnRef.value?.dispatch()
})
</script>
