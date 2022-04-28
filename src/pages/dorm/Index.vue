<template>
  <div class="row">
    <div class="col-12 q-pa-sm">
      <door-control-card />
    </div>
    <div class="col-12 q-pa-sm">
      <ac-control-card />
    </div>
  </div>
</template>

<script setup lang="ts">
import DoorControlCard from '@/components/dorm/DoorControlCard.vue'
import AcControlCard from '@/components/dorm/AcControlCard.vue'
</script>
