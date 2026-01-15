'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseGsapRevealOptions {
  delay?: number
  duration?: number
  y?: number
  opacity?: number
  stagger?: number
  trigger?: string | Element
  start?: string
  once?: boolean
}

export function useGsapReveal(options: UseGsapRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const {
    delay = 0,
    duration = 0.8,
    y = 50,
    opacity = 0,
    stagger = 0,
    trigger,
    start = 'top 80%',
    once = true,
  } = options

  useEffect(() => {
    if (!ref.current) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      gsap.set(ref.current, { opacity: 1, y: 0 })
      return
    }

    const children = ref.current.children
    const hasChildren = children.length > 0 && stagger > 0

    if (hasChildren) {
      gsap.set(Array.from(children), { opacity, y })
      gsap.to(Array.from(children), {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        scrollTrigger: {
          trigger: trigger || ref.current,
          start,
          once,
        },
      })
    } else {
      gsap.set(ref.current, { opacity, y })
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        scrollTrigger: {
          trigger: trigger || ref.current,
          start,
          once,
        },
      })
    }

    return () => {
      // Cleanup: only kill ScrollTriggers created by this hook
      const triggers = ScrollTrigger.getAll()
      triggers.forEach((st) => {
        const stTrigger = st.vars?.trigger
        const targetTrigger = trigger || ref.current
        if (stTrigger === targetTrigger || (stTrigger as Element) === targetTrigger) {
          st.kill()
        }
      })
      // Kill GSAP animations
      if (hasChildren) {
        gsap.killTweensOf(Array.from(children))
      } else {
        gsap.killTweensOf(ref.current)
      }
    }
  }, [delay, duration, y, opacity, stagger, trigger, start, once])

  return ref
}
