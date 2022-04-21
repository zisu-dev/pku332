<template>
  <q-card-section>
    <qr-scan @success="onSuccess" />
    <q-input v-model="token" :label="t('user-token')" :rules="rules" />
  </q-card-section>
  <q-card-actions>
    <q-btn color="primary" class="col-grow" @click="onUserLogin">
      {{ t('login') }}
    </q-btn>
    <q-btn
      flat
      class="col-auto"
      icon="mdi-application-cog-outline"
      @click="onAdminLogin"
    />
  </q-card-actions>
</template>

<script setup lang="ts">
import { adminLogin, userLogin } from '@/utils/api'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import QrScan from './QrScan.vue'

const emits = defineEmits<{
  (e: 'login'): void
}>()

const { t } = useI18n()
const token = ref('')
const matchRegex = /^[A-Za-z0-9_-]{21}$/
const rules = [
  (val: string) => (val.match(matchRegex) ? true : t('invalid-token'))
]

function onSuccess(text: string) {
  token.value = text
}

function onUserLogin() {
  userLogin(token.value)
  emits('login')
}

let clickCount = 0
function onAdminLogin() {
  if (clickCount === 7) {
    if (confirm('Do you really want to login as admin?')) {
      adminLogin(token.value)
    }
  } else {
    ++clickCount
  }
}
</script>
