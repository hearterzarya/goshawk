'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseSplitTextOptions {
  type?: 'words' | 'lines' | 'chars'
  delay?: number
  stagger?: number
  duration?: number
  trigger?: string | Element
  start?: string
  once?: boolean
  immediate?: boolean // If true, animate immediately instead of on scroll
}

export function useSplitText(options: UseSplitTextOptions = {}) {
  const ref = useRef<HTMLElement>(null)
  const {
    type = 'words',
    delay = 0,
    stagger = 0.05,
    duration = 0.6,
    trigger,
    start = 'top 80%',
    once = true,
    immediate = false,
  } = options

  useEffect(() => {
    if (!ref.current) return

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      if (!ref.current) return

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (prefersReducedMotion) {
        // Still split the text for proper spacing, just don't animate
        const element = ref.current
        const text = element.textContent || ''
        const words = text.split(' ').filter(word => word.length > 0)
        const items = type === 'lines' ? [text] : words
        const spans = items.map((item, index) => {
          const span = document.createElement('span')
          span.textContent = item + (type === 'words' && index < items.length - 1 ? ' ' : '')
          span.style.display = 'inline-block'
          span.style.whiteSpace = 'pre'
          return span
        })
        element.innerHTML = ''
        spans.forEach((span) => element.appendChild(span))
        return
      }

      const element = ref.current
      const text = element.textContent || ''
      const words = text.split(' ').filter(word => word.length > 0)
      const lines: string[] = []
      let currentLine = ''

      // Simple word wrapping simulation
      words.forEach((word, index) => {
        if (index === 0) {
          currentLine = word
        } else {
          const testLine = currentLine + ' ' + word
          if (testLine.length < 50) {
            currentLine = testLine
          } else {
            lines.push(currentLine)
            currentLine = word
          }
        }
      })
      if (currentLine) lines.push(currentLine)

      const items = type === 'lines' ? lines : words
      const spans = items.map((item, index) => {
        const span = document.createElement('span')
        // Add space after each word except the last one
        span.textContent = item + (type === 'words' && index < items.length - 1 ? ' ' : '')
        span.style.display = 'inline-block'
        span.style.whiteSpace = 'pre'
        span.style.opacity = '0'
        span.style.transform = 'translateY(20px)'
        return span
      })

      element.innerHTML = ''
      spans.forEach((span) => element.appendChild(span))

      const animationConfig: any = {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
      }

      if (immediate) {
        // Animate immediately without scroll trigger
        gsap.to(spans, animationConfig)
      } else {
        // Use scroll trigger
        animationConfig.scrollTrigger = {
          trigger: trigger || element,
          start,
          once,
        }
        gsap.to(spans, animationConfig)
      }
    }, 50) // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timeoutId)
      // Cleanup: kill any ScrollTriggers created for this animation
      if (ref.current && !immediate) {
        const triggers = ScrollTrigger.getAll()
        triggers.forEach((st) => {
          const stTrigger = st.vars?.trigger
          const targetTrigger = trigger || ref.current
          if (stTrigger === targetTrigger || (stTrigger as Element) === targetTrigger) {
            st.kill()
          }
        })
      }
      // Kill any GSAP animations on the element's children
      if (ref.current) {
        const spans = ref.current.querySelectorAll('span')
        spans.forEach((span) => {
          gsap.killTweensOf(span)
        })
      }
    }
  }, [type, delay, stagger, duration, trigger, start, once, immediate])

  return ref
}
