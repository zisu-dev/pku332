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
            <div class="row q-col-gutter-md justify-center">
              <div
                class="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-1"
                v-for="item in items"
              >
                <q-card
                  v-ripple
                  class="cursor-pointer q-hoverable"
                  @click="open(item)"
                >
                  <q-card-section>
                    <div class="row justify-center">
                      <img height="64" width="64" :src="item.icon" />
                    </div>
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

interface BailanItem {
  name: string
  href?: string
  icon?: string
}

const items: BailanItem[] = [
  {
    name: 'bilibili',
    href: 'https://bilibili.com/',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/bilibili.svg'
  },
  {
    name: 'pubg',
    href: 'steam://rungameid/578080',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/pubg.svg'
  },
  {
    name: 'pixiv',
    href: 'https://www.pixiv.net',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/pixiv.svg'
  },
  {
    name: 'steam',
    href: 'https://store.steampowered.com/',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/steam.svg'
  }
]

function open(item: BailanItem) {
  if (item.href) {
    window.open(item.href, '_blank')
  }
}
</script>
