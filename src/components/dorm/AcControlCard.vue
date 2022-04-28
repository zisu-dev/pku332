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
import { useI18n } from 'vue-i18n'
import AsyncBtn from '@/components/AsyncBtn.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const { t } = useI18n()
const $q = useQuasar()
const route = useRoute()
const router = useRouter()

const openAcRef = ref<InstanceType<typeof AsyncBtn> | null>(null)

async function onOpenAc() {
  throw new Error('Not implemented')
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
