<template>
  <q-btn v-bind="{ ...(props.btnProps ?? {}), loading }" @click="onClick" />
</template>

<script setup lang="ts">
import { QBtnProps, useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const props = defineProps<{
  callback: () => Promise<void | string>
  btnProps?: QBtnProps
  notifySuccess?: boolean
  notifyError?: boolean
}>()

const $q = useQuasar()
const { t } = useI18n()

const loading = ref(false)
async function onClick() {
  loading.value = true
  try {
    const ret = await props.callback()
    if (props.notifySuccess) {
      $q.notify({
        color: 'positive',
        message: ret ?? t('success')
      })
    }
  } catch (e: any) {
    if (props.notifyError) {
      $q.notify({ color: 'negative', message: e.message })
    }
  }
  loading.value = false
}
</script>
