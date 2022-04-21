<template>
  <div id="qrscan"></div>
</template>

<script setup lang="ts">
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode'
import { onBeforeUnmount, onMounted } from 'vue'

const emits = defineEmits<{
  (e: 'success', value: string): void
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
    (text) => emits('success', text),
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
