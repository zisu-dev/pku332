import { computed, ref } from 'vue'

/**
 * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt handler
 * before a user is prompted to "install" a web site to a home screen on mobile.
 *
 * @deprecated Only supported on Chrome and Android Webview.
 */
interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>
}

const event = ref<BeforeInstallPromptEvent | null>(null)
export const canInstall = computed(() => event.value !== null)

window.addEventListener('beforeinstallprompt', (ev) => {
  event.value = <BeforeInstallPromptEvent>ev
})

export function install() {
  event.value?.prompt()
}

const standaloneQuery = window.matchMedia('(display-mode: standalone)')

export const isStandalone = ref(standaloneQuery.matches)

standaloneQuery.addEventListener('change', (ev) => {
  isStandalone.value = ev.matches
})
