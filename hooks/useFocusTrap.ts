'use client'

import type { RefObject } from 'react'
import { useEffect } from 'react'

export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  enabled: boolean,
): void {
  useEffect(() => {
    if (!enabled) return
    const shell = containerRef.current
    if (!shell) return

    const focusableSelectors =
      'button:not([disabled]), [href]:not([tabindex="-1"]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

    function visibleFocusables(container: HTMLElement): HTMLElement[] {
      return [...container.querySelectorAll<HTMLElement>(focusableSelectors)].filter(
        (el) => typeof el.focus === 'function' && container.contains(el),
      )
    }

    const prev = document.activeElement as HTMLElement | null

    const usedFallbackFocus = { current: false }
    queueMicrotask(() => {
      const hinted = shell.querySelector<HTMLElement>('[data-autofocus]')
      if (hinted && typeof hinted.focus === 'function') {
        hinted.focus()
        return
      }
      const list = visibleFocusables(shell)
      if (list.length > 0) {
        list[0].focus()
        return
      }
      shell.setAttribute('tabindex', '-1')
      usedFallbackFocus.current = true
      shell.focus()
    })

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      const root = containerRef.current
      if (!root) return
      const list = visibleFocusables(root)
      if (list.length === 0) return
      const first = list[0]
      const last = list[list.length - 1]
      const active = document.activeElement
      if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      }
    }

    shell.addEventListener('keydown', onKeyDown)

    return () => {
      shell.removeEventListener('keydown', onKeyDown)
      if (usedFallbackFocus.current) shell.removeAttribute('tabindex')
      if (prev && typeof prev.focus === 'function' && document.contains(prev))
        prev.focus()
    }
  }, [enabled, containerRef])
}
