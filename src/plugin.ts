import { provide } from 'vue/src/v3/apiInject'
import { Starport } from './components/Starport'
import { StarportCarrier } from './components/StarportCarrier'
import { InjectionOptions } from './constants'
import type { StarportOptions } from './types'

export function StarportPlugin(defaultOptions: StarportOptions = {}) {
  return {
    install(Vue: any) {
      provide(InjectionOptions, defaultOptions)
      Vue.component('Starport', Starport)
      Vue.component('StarportCarrier', StarportCarrier)
    },
  }
}
