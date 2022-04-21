<template>
  <q-card-section>
    <qr-scan @success="onSuccess" />
    <q-input v-model="token" :label="t('user-token')" :rules="rules" />
  </q-card-section>
  <q-card-actions>
    <q-btn
      color="primary"
      class="col-grow"
      @click="onUserLogin"
      :loading="loginLoading"
    >
      {{ t('login') }}
    </q-btn>
    <q-btn
      flat
      class="col-auto"
      icon="mdi-application-cog-outline"
      @click="onAdminLogin"
      :loading="adminLoading"
    />
  </q-card-actions>
</template>

<script setup lang="ts">
import { adminLogin, userLogin, call } from '@/utils/api'
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import QrScan from './QrScan.vue'

const emits = defineEmits<{
  (e: 'login'): void
}>()

const $q = useQuasar()
const { t } = useI18n()
const token = ref('')
const matchRegex = /^[A-Za-z0-9_-]{21}$/
const rules = [
  (val: string) => (val.match(matchRegex) ? true : t('invalid-token'))
]

function onSuccess(text: string) {
  if (text.startsWith('332:')) {
    token.value = text.substring(4)
  }
}

const loginLoading = ref(false)
const adminLoading = ref(false)

async function onUserLogin() {
  loginLoading.value = true
  try {
    await call(token.value, 'GET', '/private/hello')
    userLogin(token.value)
    emits('login')
  } catch (e: any) {
    $q.notify({ color: 'negative', message: e.message })
  }
  token.value = ''
  loginLoading.value = false
}

let clickCount = 0
async function onAdminLogin() {
  if (clickCount === 7) {
    if (confirm('Do you really want to login as admin?')) {
      adminLoading.value = true
      try {
        await call(token.value, 'GET', '/admin/hello')
        adminLogin(token.value)
      } catch (e: any) {
        $q.notify({ color: 'negative', message: e.message })
      }
      token.value = ''
      adminLoading.value = false
    }
  } else {
    ++clickCount
  }
}
</script>
