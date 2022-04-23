<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Tokens</div>
    </q-card-section>
    <q-separator />
    <suspense>
      <tokens />
    </suspense>
  </q-card>
</template>

<script setup lang="ts">
import Tokens from '@/components/admin/Tokens.vue'
</script>
