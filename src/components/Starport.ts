import { isObject } from '@vueuse/core'
import { defineComponent, inject, markRaw, onMounted, ref } from 'vue'
import { h } from 'vue/src/v3'
import { InjectionState } from '../constants'
import { proxyProps } from '../options'
import type { v3VNode } from '../utils/vue3'
import { isVNode } from '../utils/vue3'
import { StarportProxy } from './StarportProxy'

/**
 * The proxy component wrapper for the Starport.
 */
export const Starport = defineComponent({
  name: 'Starport',
  inheritAttrs: true,
  props: proxyProps,
  setup(props, ctx) {
    const isMounted = ref(false)
    onMounted(() => {
      isMounted.value = true

      if (process.env.NODE_ENV === 'development') {
        const state = inject(InjectionState)
        if (!state)
          throw new Error('[Vue Starport] Failed to find the carrier, all Starport components must be wrapped in a <StarportCarrier> component.')
      }
    })

    return () => {
      const slots = ctx.slots.default?.()

      if (!slots)
        throw new Error('[Vue Starport] Slot is required to use <Starport>')
      if (slots.length !== 1)
        throw new Error(`[Vue Starport] <Starport> requires exactly one slot, but got ${slots.length}`)

      const slot = slots[0] as v3VNode
      let component = slot.type as any

      if (!isObject(component) || isVNode(component)) {
        component = {
          render() {
            return slots
          },
        }
      }

      return h(StarportProxy, {
        ...props,
        key: props.port,
        component: markRaw(component),
        props: slot.props,
      })
    }
  },
})
