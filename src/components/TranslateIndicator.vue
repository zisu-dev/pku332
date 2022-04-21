<template>
  <q-btn dense flat round icon="mdi-translate">
    <q-menu>
      <q-list dense>
        <q-item>
          <q-select
            v-model="locale"
            :options="localeOptions"
            borderless
            :display-value="t(locale)"
            emit-value
          >
            <template v-slot:prepend>
              <q-icon name="mdi-translate" />
            </template>
          </q-select>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale, availableLocales } = useI18n()
const localeOptions = computed(() =>
  availableLocales.map((l) => ({ label: t(l), value: l }))
)
</script>
