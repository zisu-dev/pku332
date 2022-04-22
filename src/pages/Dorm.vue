<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-card>
          <q-toolbar class="bg-primary text-white q-pr-none">
            <q-icon name="mdi-view-dashboard-outline" size="md" />
            <q-toolbar-title> {{ t('dorm') }} </q-toolbar-title>
            <q-separator dark vertical />
            <q-btn stretch flat :label="t('actions')" to="/dorm" />
            <q-separator dark vertical />
            <q-btn stretch flat :label="t('data')" to="/dorm/data" />
          </q-toolbar>
          <q-card-section v-if="isLoggedIn">
            <router-view v-slot="{ Component }">
              <transition name="router" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </q-card-section>
          <q-card-section v-else class="column items-center">
            <q-icon name="mdi-alert" size="xl" color="negative" />
            <div class="text-subtitle1">{{ t('please-login') }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { isLoggedIn } from '@/utils/api'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
