import { camelize } from 'vue/src/shared/util'
import type { VNode } from 'vue'

export interface v3VNode extends VNode {
  type: any
  props: any
}

export function mergeProps(to: any, from: any) {
  for (const key in from)
    to[camelize(key)] = from[key]
}

export function isVNode(value: any) {
  return value ? value.__v_isVNode === true : false
}
