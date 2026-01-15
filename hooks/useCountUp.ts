'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseCountUpOptions {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  trigger?: string | Element
  start?: string
  once?: boolean
}

export function useCountUp(options: UseCountUpOptions) {
  const { end, duration = 2, suffix = '', prefix = '', decimals = 0, trigger, start = 'top 80%', once = true } = options
  const ref = useRef<HTMLElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!ref.current) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setValue(end)
      return
    }

    const obj = { value: 0 }
    const targetTrigger = trigger || ref.current
    
    const animation = gsap.to(obj, {
      value: end,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        setValue(Number(obj.value.toFixed(decimals)))
      },
      scrollTrigger: {
        trigger: targetTrigger,
        start,
        once,
      },
    })

    return () => {
      // Cleanup: kill only the ScrollTrigger for this animation
      const triggers = ScrollTrigger.getAll()
      triggers.forEach((st) => {
        const stTrigger = st.vars?.trigger
        if (stTrigger === targetTrigger || (stTrigger as Element) === targetTrigger) {
          st.kill()
        }
      })
      // Kill the animation
      animation.kill()
    }
  }, [end, duration, decimals, trigger, start, once])

  return { ref, value: `${prefix}${value}${suffix}` }
}
