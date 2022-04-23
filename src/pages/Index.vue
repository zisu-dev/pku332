<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 col-md-6 col-lg-4 q-pa-sm">
        <realtime-info-card />
      </div>
      <div v-if="isLoggedIn" class="col-12 col-md-6 col-lg-4 q-pa-sm">
        <quick-action-card />
      </div>
      <div class="col-12 col-md-6 col-lg-4 q-pa-sm">
        <q-card>
          <q-card-section>
            <div class="text-h1 text-center">🦜</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <p>To be or</p>
            <p>not to be</p>
            <p>that is the question.</p>
            <p>Whether 'tis nobler in the mind to suffer</p>
            <p>The slings and arrows of outrageous fortune</p>
            <p>Or to take arms against a sea of troubles</p>
            <p>And by opposing end them.</p>
            <p>To die is to commit <q-icon name="mdi-heart-broken" /></p>
            <p>And by a sleep to say we end</p>
            <p>Not that it is easy,</p>
            <p>Nor that it is trouble free.</p>
            <p>But it is the future.</p>
            <p>The past has no power to stop</p>
            <p>The future is promised.</p>
            <p>It is not the past, it is the future that we must prepare for.</p>
            <p>We must act now, not wait for the future.</p>
            <p>We must act now, not wait for the future.</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import RealtimeInfoCard from '@/components/RealtimeInfoCard.vue'
import QuickActionCard from '@/components/QuickActionCard.vue'
import { isLoggedIn } from '@/utils/api'
</script>
