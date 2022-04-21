<template>
  <div id="qrscan"></div>
</template>

<script setup lang="ts">
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode'
import { onBeforeUnmount, onMounted } from 'vue'

const props = defineProps<{
  callback: (text: string) => void | boolean
}>()

const emits = defineEmits<{
  (e: 'error', value: string): void
}>()

let scanner: Html5QrcodeScanner

onMounted(() => {
  scanner = new Html5QrcodeScanner(
    'qrscan',
    {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    },
    false
  )
  scanner.render(
    (text) => {
      if (props.callback(text)) {
        scanner.pause()
      }
    },
    (err) => emits('error', err)
  )
})

onBeforeUnmount(() => {
  scanner.clear()
})
</script>

<style scoped>
#qrscan {
  min-width: 320px;
}
</style>
