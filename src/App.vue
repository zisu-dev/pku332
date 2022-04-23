<template>
  <q-layout view="lHh LpR lFf">
    <q-header elevated class="bg-pku text-white">
      <q-toolbar>
        <q-btn dense flat round icon="mdi-menu" @click="toggleLeftDrawer" />
        <q-toolbar-title style="overflow: visible">PKU332</q-toolbar-title>
        <q-space />
        <user-indicator />
        <github-indicator />
        <translate-indicator />
        <q-btn v-if="canInstall && !isStandalone" dense color="primary" unelevated icon="mdi-arrow-down-bold-box" @click="onInstall" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" show-if-above bordered>
      <q-list>
        <q-item clickable v-ripple v-for="(item, i) in navItems" :key="i" :to="item.to">
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ t(item.label) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="router" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <div class="row justify-center">
        <div>
          <code>&copy;thezzisu {{ GIT_HASH }} {{ useFallback ? 'F' : 'L' }}</code>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import UserIndicator from '@/components/UserIndicator.vue'
import TranslateIndicator from '@/components/TranslateIndicator.vue'
import GithubIndicator from '@/components/GithubIndicator.vue'
import { isAdmin, useFallback } from '@/utils/api'
import { canInstall, install, isStandalone } from '@/utils/pwa'

const { t } = useI18n()
const navItems = computed(() => [
  { to: '/', label: 'home', icon: 'mdi-home' },
  { to: '/dorm', label: 'dorm', icon: 'mdi-view-dashboard' },
  { to: '/tools', label: 'tools', icon: 'mdi-toolbox' },
  {
    to: '/pubgnote',
    label: 'pubgnote',
    icon: 'img:https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/pubg.svg'
  },
  ...(isAdmin.value ? [{ to: '/admin', label: 'admin', icon: 'mdi-account-wrench' }] : [])
])
const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function onInstall() {
  install()
}

const GIT_HASH = import.meta.env.VITE_GIT_HASH
</script>

<style>
.router-enter-active,
.router-leave-active {
  transition: opacity 0.1s ease;
}

.router-enter-from,
.router-leave-to {
  opacity: 0;
}
</style>
