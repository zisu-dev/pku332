<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Debug: Door</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="row q-gutter-sm items-center">
      <q-btn outline label="Add Stage" @click="stages.push({ speed: 1500, ms: 100 })" />
      <q-btn outline label="Remove Stage" @click="stages.pop()" />
      <async-btn ref="fetchBtnRef" :btn-props="{ outline: true, label: 'Fetch' }" :callback="loadArgs" notify-success />
      <async-btn :btn-props="{ outline: true, label: 'Save' }" :callback="saveArgs" notify-success />
    </q-card-section>
    <q-card-section class="row">
      <div v-for="(stage, i) of stages" class="q-pa-xs">
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
    <q-card-actions>
      <async-btn
        :btn-props="{ color: 'primary', label: t('open-door') }"
        :callback="dispatch"
        ref="openDoorRef"
        notify-success
        class="col-grow"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { adminCall, userAction } from '@/utils/api'
import AsyncBtn from '@/components/AsyncBtn.vue'

const { t } = useI18n()
const stages = ref<{ speed: number; ms: number }[]>([])

const fetchBtnRef = ref<InstanceType<typeof AsyncBtn> | null>(null)

const loadArgs = async () => {
  stages.value = await adminCall('GET', '/open_door_args')
}

const saveArgs = async () => {
  await adminCall('POST', '/open_door_args', { args: stages.value })
}

const dispatch = async () => {
  await userAction('servo_run_seq', 'esp01', {
    stages: stages.value
  })
}

onMounted(() => {
  fetchBtnRef.value?.dispatch()
})
</script>
