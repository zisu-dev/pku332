<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ t('wheretoeat') }}</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="row justify-center">
              <div class="text-h3">
                {{ eatLoc }}
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="primary" @click="gen()" :loading="loading">
              {{ t('tellme') }}
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { wait } from '@/utils/async'

const { t } = useI18n()

const eatLoc = ref('不知道')
const loading = ref(false)
const locs = [
  '家一',
  '家二',
  '家三',
  '家四',
  '学一',
  '学五',
  '农一',
  '农二',
  '燕南',
  '勺园',
  '麦叔',
  '方便面',
  '空气'
]

async function gen() {
  loading.value = true
  await wait(500)
  eatLoc.value = locs[Math.floor(Math.random() * locs.length)]
  loading.value = false
}
</script>
