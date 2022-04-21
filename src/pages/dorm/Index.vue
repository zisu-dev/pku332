<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-subtitle1">{{ t('door-control') }}</div>
    </q-card-section>
    <q-separator inset />
    <q-card-actions>
      <async-btn
        :btn-props="{ color: 'primary', label: t('open-door') }"
        :callback="onOpenDoor"
        notify-success
      />
      <async-btn
        :btn-props="{
          color: 'primary',
          icon: 'mdi-reload',
          label: t('adjust-clockwise'),
          outline: true
        }"
        :callback="onAdjustCW"
        notify-success
      />
      <async-btn
        :btn-props="{
          color: 'primary',
          icon: 'mdi-restore',
          label: t('adjust-counterclockwise'),
          outline: true
        }"
        :callback="onAdjustCC"
        notify-success
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AsyncBtn from '@/components/AsyncBtn.vue'
import { wait } from '@/utils/async'
import { userAction } from '@/utils/api'

const { t } = useI18n()

async function onOpenDoor() {
  await userAction('servo_run_seq', 'esp01', {
    stages: [
      { speed: 1700, ms: 3000 },
      { speed: 1500, ms: 2000 },
      { speed: 1300, ms: 3000 }
    ]
  })
}

async function onAdjustCW() {
  await userAction('servo_run_sync', 'esp01', {
    speed: 1600,
    ms: 500
  })
}

async function onAdjustCC() {
  await userAction('servo_run_sync', 'esp01', {
    speed: 1400,
    ms: 500
  })
}
</script>
