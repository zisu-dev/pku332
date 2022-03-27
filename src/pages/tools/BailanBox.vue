<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ t('bailanbox') }}</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-4" v-for="item in items">
                <q-card
                  v-ripple
                  class="cursor-pointer q-hoverable"
                  @click="open(item)"
                >
                  <q-card-section>
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

const { t } = useI18n()
const items = [
  { name: 'bilibili', href: 'https://bilibili.com/' },
  { name: 'PUBG', href: '' }
]

function open(item: any) {
  //
}
</script>
