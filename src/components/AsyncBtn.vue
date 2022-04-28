<template>
  <q-btn v-bind="{ ...(props.btnProps ?? {}), loading }" @click="dispatch" v-touch-hold.mouse="dispatchHold" />
</template>

<script setup lang="ts">
import { QBtnProps, useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    callback: () => Promise<void | string>
    holdCallback?: () => Promise<void | string>
    btnProps?: QBtnProps
    notifySuccess?: boolean
    notifyError?: boolean
  }>(),
  { notifyError: true }
)

const $q = useQuasar()
const { t } = useI18n()

const loading = ref(false)

const dispatch = async () => {
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

const dispatchHold = async () => {
  if (!props.holdCallback) return
  loading.value = true
  try {
    const ret = await props.holdCallback()
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

defineExpose({ dispatch, dispatchHold })
</script>
