<template>
  <q-card-section>
    <qr-scan :callback="onSuccess" />
    <q-input ref="inputRef" clearable v-model="token" :label="t('user-token')" :rules="rules" />
  </q-card-section>
  <q-card-actions>
    <q-btn color="primary" class="col-grow" @click="onUserLogin" :loading="loginLoading">
      {{ t('login') }}
    </q-btn>
    <q-btn flat class="col-auto" icon="mdi-application-cog-outline" @click="onAdminLogin" :loading="adminLoading" />
  </q-card-actions>
</template>

<script setup lang="ts">
import { adminLogin, userLogin, call } from '@/utils/api'
import { QInput, useQuasar } from 'quasar'
import { nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import QrScan from '@/components/QrScan.vue'

const emits = defineEmits<{
  (e: 'login'): void
}>()

const $q = useQuasar()
const { t } = useI18n()
const token = ref('')
const inputRef = ref<InstanceType<typeof QInput> | null>(null)

const matchRegex = /^[A-Za-z0-9_-]{21}$/
const rules = [(val: string) => (val.match(matchRegex) ? true : t('invalid-token'))]

function onSuccess(text: string) {
  if (text.startsWith('332:')) {
    token.value = text.substring(4)
  }
}

const loginLoading = ref(false)
const adminLoading = ref(false)

async function onUserLogin() {
  if (!inputRef.value?.validate()) {
    $q.notify({ color: 'negative', message: t('invalid-token') })
    return
  }
  loginLoading.value = true
  try {
    await call(token.value, 'GET', '/private/hello')
    userLogin(token.value)
    emits('login')
    $q.notify({ color: 'positive', message: t('success') })
  } catch (e: any) {
    $q.notify({ color: 'negative', message: e.message })
  }
  token.value = ''
  nextTick(() => inputRef.value?.resetValidation())
  loginLoading.value = false
}

let clickCount = 0
async function onAdminLogin() {
  if (clickCount === 7) {
    if (confirm('Do you really want to login as admin?')) {
      if (!inputRef.value?.validate()) {
        $q.notify({ color: 'negative', message: t('invalid-token') })
        return
      }
      adminLoading.value = true
      try {
        await call(token.value, 'GET', '/admin/hello')
        adminLogin(token.value)
        $q.notify({ color: 'positive', message: t('success') })
      } catch (e: any) {
        $q.notify({ color: 'negative', message: e.message })
      }
      token.value = ''
      nextTick(() => inputRef.value?.resetValidation())
      adminLoading.value = false
    }
  } else {
    ++clickCount
  }
}
</script>
