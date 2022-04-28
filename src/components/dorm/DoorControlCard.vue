<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-subtitle1">{{ t('door-control') }}</div>
    </q-card-section>
    <q-separator inset />
    <q-card-actions>
      <async-btn
        :btn-props="{
          color: 'primary',
          icon: 'mdi-restore',
          label: $q.screen.lt.sm ? '' : t('adjust-counterclockwise'),
          outline: true
        }"
        :callback="onAdjustCC"
        :hold-callback="onAdjustCCH"
        notify-success
        :class="$q.screen.lt.sm ? '' : 'col-grow'"
      />
      <async-btn
        :btn-props="{
          color: 'primary',
          icon: 'mdi-restore',
          label: t('open-door')
        }"
        :callback="onOpenDoor"
        notify-success
        class="col-grow"
        ref="openDoorRef"
      />
      <async-btn
        :btn-props="{
          color: 'primary',
          icon: 'mdi-reload',
          label: t('close-door')
        }"
        :callback="onCloseDoor"
        notify-success
        class="col-grow"
      />
      <async-btn
        :btn-props="{
          color: 'primary',
          icon: 'mdi-reload',
          label: $q.screen.lt.sm ? '' : t('adjust-clockwise'),
          outline: true
        }"
        :callback="onAdjustCW"
        :hold-callback="onAdjustCWH"
        notify-success
        :class="$q.screen.lt.sm ? '' : 'col-grow'"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AsyncBtn from '@/components/AsyncBtn.vue'
import { userAction, userCall } from '@/utils/api'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const { t } = useI18n()
const $q = useQuasar()
const route = useRoute()
const router = useRouter()

const openDoorRef = ref<InstanceType<typeof AsyncBtn> | null>(null)

async function onOpenDoor() {
  await userCall('POST', '/open_door', { node: 'esp01' })
}

async function onCloseDoor() {
  await userCall('POST', '/close_door', { node: 'esp01' })
}

async function onAdjustCW() {
  await userAction('servo_run_sync', 'esp01', {
    speed: 1400,
    ms: 100
  })
}

async function onAdjustCWH() {
  await userAction('servo_run_sync', 'esp01', {
    speed: 1000,
    ms: 200
  })
}

async function onAdjustCC() {
  await userAction('servo_run_sync', 'esp01', {
    speed: 1600,
    ms: 100
  })
}

async function onAdjustCCH() {
  await userAction('servo_run_sync', 'esp01', {
    speed: 2000,
    ms: 200
  })
}

onMounted(() => {
  const { action, ...query } = route.query
  if (action === 'open_door') {
    openDoorRef.value?.dispatch().then(() => {
      router.replace({ query })
    })
  }
})
</script>
