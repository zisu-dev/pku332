<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ t('tools') }}</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-4" v-for="item in tools">
                <q-card
                  v-ripple
                  class="cursor-pointer q-hoverable"
                  @click="router.push(`/tools/${item.name}`)"
                >
                  <q-card-section>
                    <div class="text-h3 text-center">{{ item.icon }}</div>
                    <div class="text-h6 text-center">{{ t(item.name) }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()
const tools = [
  {
    name: 'bailanbox',
    icon: '🤗'
  }
]
</script>
