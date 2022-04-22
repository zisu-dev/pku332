import { registerSW } from 'virtual:pwa-register'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify, Dialog } from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'
import quasarIconSet from 'quasar/icon-set/mdi-v6'
import '@quasar/extras/mdi-v6/mdi-v6.css'
import 'quasar/src/css/index.sass'
import App from '@/App.vue'
import router from '@/routes'
import i18n from '@/plugins/i18n'
import '@/styles/main.css'

const updateSW = registerSW({
  onNeedRefresh() {
    Notify.create({
      color: 'primary',
      message: i18n.global.t('new-content-available'),
      actions: [
        {
          label: i18n.global.t('reload'),
          color: 'white',
          handler: () => updateSW()
        },
        { label: i18n.global.t('dismiss'), color: 'white' }
      ]
    })
  },
  onOfflineReady() {
    Notify.create({
      color: 'primary',
      message: i18n.global.t('offline-ready'),
      actions: [{ label: i18n.global.t('dismiss'), color: 'white' }]
    })
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Quasar, {
  plugins: { Notify, Dialog },
  lang: quasarLang,
  iconSet: quasarIconSet
})

app.mount('#app')
