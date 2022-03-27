<template>
  <q-layout view="lHh lpR lff">
    <q-header elevated class="bg-pku text-white">
      <q-toolbar>
        <q-btn dense flat round icon="mdi-menu" @click="toggleLeftDrawer" />
        <q-toolbar-title style="overflow: visible">PKU332</q-toolbar-title>
        <q-space />
        <q-select
          v-model="locale"
          :options="localeOptions"
          borderless
          dark
          :display-value="t(locale)"
          emit-value
        >
          <template v-slot:prepend>
            <q-icon name="mdi-translate" />
          </template>
        </q-select>
        <q-btn
          dense
          flat
          round
          icon="mdi-github"
          href="https://github.com/zisu-dev/pku332"
          target="_blank"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" show-if-above bordered>
      <q-list>
        <q-item
          clickable
          v-ripple
          v-for="(item, i) in navItems"
          :key="i"
          :to="item.to"
        >
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
        <div>&copy; thezzisu 2022</div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale, availableLocales } = useI18n()
const localeOptions = computed(() =>
  availableLocales.map((l) => ({ label: t(l), value: l }))
)
const navItems = [
  { to: '/', label: 'home', icon: 'mdi-home' },
  { to: '/tools', label: 'tools', icon: 'mdi-toolbox' }
]
const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
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
