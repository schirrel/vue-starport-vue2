import { defineComponent, inject, provide } from 'vue'
import { h } from 'vue/src/v3'
import { InjectionOptions, InjectionState } from '../constants'
import { createInternalState } from '../state'
import { StarportCraft } from './StarportCraft'
/**
 * The carrier component for all the flying Starport components
 * Should be initialized in App.vue only once.
 */
export const StarportCarrier = defineComponent({
  name: 'StarportCarrier',
  setup(_, { slots }) {
    const state = createInternalState(inject(InjectionOptions, {}))
    provide(
      InjectionState, state,
    )

    return () => {
      return [
        slots.default?.(),
        Array.from(state.portMap.entries())
          .map(([port, { component }]) => h(
            StarportCraft,
            { key: port, port, component },
          )),
      ]
    }
  },
})
