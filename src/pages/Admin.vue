<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ t('admin') }}</div>
          </q-card-section>
          <q-separator />
          <suspense>
            <admin-tokens />
          </suspense>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AdminTokens from '@/components/AdminTokens.vue'

const { t } = useI18n()
</script>
