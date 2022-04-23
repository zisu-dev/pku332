<template>
  <q-card-section>
    <q-table
      title="Tokens"
      row-key="id"
      :rows="tokens"
      :columns="columns"
      bordered
      flat
    >
      <template v-slot:top>
        <div class="text-subtitle2">{{ t('tokens') }}</div>
        <q-space />
        <q-btn
          icon="mdi-refresh"
          dense
          flat
          round
          :loading="refreshLoading"
          @click="onRefresh"
        />
        <q-btn icon="mdi-plus" dense flat round @click="dialogOpen = true">
          <q-dialog v-model="dialogOpen">
            <q-card>
              <q-card-section>
                <div class="text-h6">{{ t('new-token') }}</div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-input v-model="comment" :label="t('comment')" />
              </q-card-section>
              <q-card-actions>
                <q-btn color="primary" class="col-grow" @click="onGenerate">
                  {{ t('generate') }}
                </q-btn>
              </q-card-actions>
              <template v-if="generated">
                <q-separator />
                <q-card-section>
                  <q-input readonly v-model="generated" :label="t('token')" />
                  <img :src="qrcode" />
                </q-card-section>
              </template>
            </q-card>
          </q-dialog>
        </q-btn>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="mdi-delete"
            dense
            flat
            round
            color="negative"
            @click="onRemoveToken(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
    <q-inner-loading :showing="removeLoading" />
  </q-card-section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { generateToken, getTokens, removeToken } from '@/utils/api'
import { useQuasar } from 'quasar'
import { computed } from '@vue/reactivity'
import { toDataURL } from 'qrcode'

const { t } = useI18n()
const $q = useQuasar()

const columns: any[] = [
  {
    name: 'id',
    label: t('id'),
    field: 'id',
    sortable: true,
    required: true,
    align: 'left'
  },
  { name: 'comment', label: t('comment'), field: 'comment' },
  { name: 'created_at', label: t('created-at'), field: 'created_at' },
  { name: 'actions', label: t('actions'), field: '' }
]

const tokens = ref(await getTokens())

const refreshLoading = ref(false)
async function onRefresh() {
  refreshLoading.value = true
  tokens.value = await getTokens()
  refreshLoading.value = false
}

const removeLoading = ref(false)
async function onRemoveToken(id: number) {
  removeLoading.value = true
  try {
    await removeToken(id)
  } catch (e: any) {
    $q.notify({
      color: 'negative',
      message: e.message
    })
  }
  await onRefresh()
  removeLoading.value = false
}

const dialogOpen = ref(false)
const generateLoading = ref(false)
const comment = ref('')
const generated = ref('')
const qrcode = ref('')

async function onGenerate() {
  generateLoading.value = true
  try {
    const { token } = await generateToken(comment.value)
    generated.value = token
    qrcode.value = await toDataURL('332:' + generated.value, { width: 512 })
  } catch (e: any) {
    $q.notify({
      color: 'negative',
      message: e.message
    })
  }
  await onRefresh()
  comment.value = ''
  generateLoading.value = false
}
</script>
