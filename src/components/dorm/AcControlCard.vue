<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-subtitle1">{{ t('ac-control') }}</div>
    </q-card-section>
    <q-separator inset />
    <q-card-actions>
      <async-btn
        :btn-props="{
          color: 'primary',
          icon: 'mdi-air-conditioner',
          label: t('open-ac')
        }"
        :callback="onOpenAc"
        notify-success
        ref="openAcRef"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import AsyncBtn from '@/components/AsyncBtn.vue'
import { userCall } from '@/utils/api'

const { t } = useI18n()
const $q = useQuasar()
const route = useRoute()
const router = useRouter()

const openAcRef = ref<InstanceType<typeof AsyncBtn> | null>(null)

async function onOpenAc() {
  await userCall('POST', '/ac_send', { id: 0 })
}

onMounted(() => {
  const { action, ...query } = route.query
  if (action === 'open_ac') {
    openAcRef.value?.dispatch().then(() => {
      router.replace({ query })
    })
  }
})
</script>
