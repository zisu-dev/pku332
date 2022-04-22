<template>
  <q-btn dense flat round icon="mdi-account-circle">
    <q-popup-proxy v-model="open">
      <q-card>
        <q-card-section class="row justify-start items-center">
          <q-icon
            size="32px"
            :name="isAdmin ? 'mdi-account-wrench' : 'mdi-account'"
          />
          <div class="q-pl-md text-h6">
            {{ isLoggedIn ? t('welcome') : t('not-logged-in') }}
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions v-if="isLoggedIn">
          <q-btn color="negative" class="col-grow" @click="onLogout">
            {{ t('logout') }}
          </q-btn>
        </q-card-actions>
        <login-section v-else @login="onLogin" />
      </q-card>
    </q-popup-proxy>
  </q-btn>
</template>

<script setup lang="ts">
import { adminLogin, isAdmin, isLoggedIn, userLogin } from '@/utils/api'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LoginSection from '@/components/LoginSection.vue'

const { t } = useI18n()
const open = ref(false)

function onLogout() {
  userLogin('')
  adminLogin('')
  open.value = false
}

function onLogin() {
  open.value = false
}
</script>
