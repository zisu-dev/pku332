<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 col-md-6 col-xl-4">
        <q-card>
          <q-card-section class="row justify-between items-center">
            <div class="text-h6">{{ t('pubgnote') }}</div>
            <q-btn
              icon="img:https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/pubg.svg"
              :label="t('play now')"
              push
              color="warning"
              href="steam://rungameid/578080"
            />
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="row justify-center q-gutter-md">
              <q-btn
                href="https://thezzisu.notion.site/2c8386f9046740a48d4fcafdd1b72c5b"
                icon="mdi-open-in-new"
                target="_blank"
                color="primary"
                :label="t('goto') + ' notion'"
              />
              <q-btn
                href="https://www.notion.so/2c8386f9046740a48d4fcafdd1b72c5b"
                icon="mdi-pencil"
                target="_blank"
                color="positive"
              />
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
</script>
