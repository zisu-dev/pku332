<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-center">{{ t('quick-actions') }}</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="row q-gutter-md">
      <q-btn to="/dorm?action=open_door" unelevated color="primary" :label="t('open-door')" />
      <q-btn to="/dorm/data" unelevated color="secondary" :label="t('data')" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
