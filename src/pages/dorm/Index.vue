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
        ref="openDoorRef"
        notify-success
        class="col-grow"
      />
      <q-btn icon="mdi-cog-sync" :label="t('advanced-settings')" outline>
        <q-popup-proxy>
          <q-card>
            <q-card-actions>
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
        </q-popup-proxy>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AsyncBtn from '@/components/AsyncBtn.vue'
import { userAction, userCall } from '@/utils/api'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const openDoorRef = ref<InstanceType<typeof AsyncBtn> | null>(null)

async function onOpenDoor() {
  await userCall('POST', '/open_door', { node: 'esp01' })
}

async function onAdjustCW() {
  await userAction('servo_run_sync', 'esp01', {
    speed: 1400,
    ms: 100
  })
}

async function onAdjustCC() {
  await userAction('servo_run_sync', 'esp01', {
    speed: 1600,
    ms: 100
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
