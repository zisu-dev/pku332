<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 q-pa-sm">
        <tokens-card />
      </div>
      <div class="col-12 q-pa-sm">
        <door-card />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import TokensCard from '@/components/admin/TokensCard.vue'
import DoorCard from '@/components/admin/DoorCard.vue'
</script>
