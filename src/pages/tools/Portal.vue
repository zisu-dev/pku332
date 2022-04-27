<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ t('portal') }}</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="row q-col-gutter-md justify-center items-stretch">
              <div class="col-6 col-sm-4 col-md-3 col-lg-2 z-blitem" v-for="item in items">
                <q-card v-ripple class="cursor-pointer q-hoverable full-height" @click="open(item)">
                  <q-card-section>
                    <div class="row justify-center">
                      <img height="64" width="64" :src="item.icon" />
                    </div>
                    <div class="text-h6 text-center">{{ item.name }}</div>
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
    name: 'Z-Library',
    href: 'https://z-lib.org',
    icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Crect width='32' height='32' rx='4' fill='white'/%3E%3Cpath d='M11.2676 4.23853L15.4548 16.9499L15.4566 16.9492L15.5094 17.103C15.7101 17.0202 15.9276 16.97 16.1577 16.9666C16.4041 16.9625 16.642 17.0112 16.8617 17.1008L16.9122 16.9607L16.9204 16.9637L20.9585 4.23853H20.7106L16.7546 16.6912L19.2201 4.23853H18.9796L16.5654 16.3983L17.7214 4.23853H17.4839L16.3041 16.7425C16.287 16.7414 16.2707 16.7388 16.2536 16.738L16.2788 16.7377L16.3532 4.23853H16.1157L16.0417 16.7414H16.0476C16.0372 16.7421 16.0272 16.744 16.0168 16.7447L14.9824 4.23853H14.7441L15.7536 16.5146L13.1056 4.23853H12.8637L15.4429 16.1961L11.517 4.23853H11.2676V4.23853Z' fill='%23C7C6C7'/%3E%3Cpath d='M17.4477 28.9115V21.3846H14.7793V28.9115L16.1133 27.5384L17.4477 28.9115Z' fill='%2349AFD0'/%3E%3Cpath d='M24.7428 3.40015L21.5677 4.23871L16.8248 17.0887H15.5179L10.7947 4.1703L7.59961 3.40015L13.7222 20.0385L18.6822 20.0434L24.7428 3.40015Z' fill='%23626062'/%3E%3C/svg%3E`
  },
  {
    name: 'Google Scholar',
    href: 'https://scholar.google.com',
    icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%234285f4' d='M256 411.12L0 202.667 256 0z'/%3E%3Cpath fill='%23356ac3' d='M256 411.12l256-208.453L256 0z'/%3E%3Ccircle fill='%23a0c3ff' cx='256' cy='362.667' r='149.333'/%3E%3Cpath fill='%2376a7fa' d='M121.037 298.667c23.968-50.453 75.392-85.334 134.963-85.334s110.995 34.881 134.963 85.334H121.037z'/%3E%3C/svg%3E`
  },
  {
    name: 'PKU Disk',
    href: 'https://disk.pku.edu.cn',
    icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 709 709'%3E%3Cdefs%3E%3Cstyle%3E.cls-1,.cls-2%7Bfill:%239b0000;%7D.cls-2%7Bfont-size:193.75px;font-family:Arial-BoldMT, Arial;font-weight:700;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M550.88,136.63C540.75,59.72,474.77.17,395.14.17,308.51.17,238,70.64,238,157.27V404.36c-12.08.06-30.7.11-59.28.11a112.1,112.1,0,0,1,0-224.2v-45c-86.63,0-157.1,70.48-157.1,157.1s70.47,157.1,157.1,157.1h.44l.16,40.63c37.73-.15,66.09-10.3,84.27-30.17A74.38,74.38,0,0,0,283,412.75V157.27a112,112,0,1,1,67.36,102.81c-2.89-1.25-6.22-2.89-9.6-4.65V304.7a156.2,156.2,0,0,0,54.35,9.66c78.19,0,143.21-57.41,155.14-132.29a112.1,112.1,0,0,1-20,222.4H340.79v45H530.25c86.63,0,157.1-70.47,157.1-157.1C687.35,212.74,627.79,146.77,550.88,136.63Z'/%3E%3Ctext class='cls-2' transform='translate(164.49 708) scale(1.01 1)'%3EPKU%3C/text%3E%3C/svg%3E`
  },
  {
    name: 'Overleaf',
    href: 'https://www.overleaf.com',
    icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' id='Layer_1' data-name='Layer 1' viewBox='0 0 841.89 852.62'%3E%3Cdefs%3E%3Cmask id='mask' x='174.51' y='91.03' width='1280.35' height='670.56' maskUnits='userSpaceOnUse'%3E%3Cg id='b'%3E%3Cpath id='a' d='M1454.86,761.33H174.77V91H1454.86Z' fill='%23fff'/%3E%3C/g%3E%3C/mask%3E%3C/defs%3E%3Ctitle%3Estickers alt%3C/title%3E%3Cg mask='url(%23mask)'%3E%3Cpath d='M753,112C662.45,76.7,334.23,63.65,333.68,259.49,237.92,320.8,174.51,420.79,174.51,527.67c0,129.22,104.74,233.91,234,233.91s234-104.74,234-233.91A233.93,233.93,0,0,0,491.82,309c-16.94-6.55-53.74-18.1-83.13-15.62-41.93,26.66-93.06,81.47-117.24,136.06,35.94-43.13,92.12-62,141.88-53.91A154.17,154.17,0,0,1,562.54,527.63c0,85.15-69.31,154.12-154.46,154.12a153.66,153.66,0,0,1-117.24-54c-41.5-48.86-52.2-101.83-43.64-153.6C276.77,292.65,492,189.4,652,149.74c-52.2,27.64-146.33,73-212.22,122.5C631.9,346.43,663,184.44,753,112Z' fill='%2347a141'/%3E%3C/g%3E%3C/svg%3E`
  },
  {
    name: 'Notion',
    href: 'https://www.notion.so',
    icon: 'https://res.zisu.dev/defined/notion'
  }
]

function open(item: BailanItem) {
  if (item.href) {
    window.open(item.href, '_blank')
  }
}
</script>

<style>
.z-blitem {
  max-width: 220px !important;
}
</style>
