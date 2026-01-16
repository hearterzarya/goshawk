'use client'

import { useEffect, useRef, useState } from 'react'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Button } from '@/components/ui/Button'
import { Check, Truck, Package, ArrowRight, MapPin, Zap } from 'lucide-react'

const trustItems = [
  '24/7 Support',
  'Real-time Updates',
  'Verified Carrier Network',
]

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const logisticsIconsRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [gsapLoaded, setGsapLoaded] = useState(false)
  const [content, setContent] = useState({
    headline: 'Logistics that moves your business forward',
    subtext: 'Premium freight brokerage delivering reliable transportation solutions across North America. From full truckload to cross-border shipping, we connect you with verified carriers.',
    heroImage: '',
    ctaPrimary: 'Request a Quote',
    ctaSecondary: 'Talk to Dispatch',
  })

  useEffect(() => {
    setIsMounted(true)
    
    // Load dynamic content
    fetch('/api/admin/content/home')
      .then(res => res.json())
      .then(data => {
        if (data && data.headline) {
          setContent(data)
        }
      })
      .catch(() => {
        // Use default content if API fails
      })
    
    // Dynamically import GSAP only on client side
    if (typeof window !== 'undefined') {
      import('gsap').then((gsapModule) => {
        const gsap = gsapModule.gsap || gsapModule.default
        if (gsap) {
          setGsapLoaded(true)
          // Register ScrollTrigger if available
          import('gsap/ScrollTrigger').then((stModule) => {
            const ScrollTrigger = stModule.ScrollTrigger || stModule.default
            if (ScrollTrigger) {
              gsap.registerPlugin(ScrollTrigger)
            }
          }).catch(() => {
            // ScrollTrigger not critical for Hero animations
          })
        }
      }).catch((err) => {
        console.warn('GSAP failed to load, using CSS animations:', err)
      })
    }
  }, [])

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const animateElements = async () => {
      try {
        let gsap: any = null
        if (gsapLoaded) {
          const gsapModule = await import('gsap')
          gsap = gsapModule.gsap || gsapModule.default
        }

        // Animate headline text
        if (headlineRef.current) {
          const element = headlineRef.current
          const text = content.headline || 'Logistics that moves your business forward'
          const words = text.split(' ').filter(word => word.length > 0)
          
          // Clear and split into spans
          element.innerHTML = ''
          const spans: HTMLSpanElement[] = []
          
          words.forEach((word, index) => {
            const span = document.createElement('span')
            span.textContent = word + (index < words.length - 1 ? ' ' : '')
            span.style.display = 'inline-block'
            span.style.whiteSpace = 'pre'
            
            // Add special styling for key words
            const lowerWord = word.toLowerCase()
            if (lowerWord === 'moves' || lowerWord === 'forward') {
              span.className = 'hero-word hero-word-emphasis'
              span.style.color = '#ea580c' // Primary orange
            } else if (lowerWord === 'logistics' || lowerWord === 'business') {
              span.className = 'hero-word hero-word-bold'
            } else {
              span.className = 'hero-word'
            }
            
            if (!prefersReducedMotion) {
              span.style.opacity = '0'
              span.style.transform = 'translateY(30px)'
            } else {
              span.style.opacity = '1'
            }
            element.appendChild(span)
            spans.push(span)
          })

          // Animate words in
          if (!prefersReducedMotion && spans.length > 0) {
            if (gsap) {
              gsap.to(spans, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.2,
                stagger: 0.08,
                ease: 'power3.out',
              })
              
              // Add special bounce animation for emphasis words
              const emphasisWords = element.querySelectorAll('.hero-word-emphasis')
              emphasisWords.forEach((word) => {
                gsap.to(word, {
                  scale: 1.1,
                  duration: 0.3,
                  delay: 1.2,
                  yoyo: true,
                  repeat: 1,
                  ease: 'power2.inOut',
                })
              })
            } else {
              // Fallback: CSS animation
              spans.forEach((span, index) => {
                span.style.transition = `opacity 0.8s ease-out ${0.2 + index * 0.08}s, transform 0.8s ease-out ${0.2 + index * 0.08}s`
                setTimeout(() => {
                  span.style.opacity = '1'
                  span.style.transform = 'translateY(0)'
                }, 50)
              })
            }
          } else if (spans.length > 0) {
            // Reduced motion: show immediately
            spans.forEach(span => {
              span.style.opacity = '1'
              span.style.transform = 'translateY(0)'
            })
          }
        }

        // Animate subtext
        if (subtextRef.current) {
          subtextRef.current.textContent = content.subtext || ''
          if (!prefersReducedMotion) {
            if (gsap) {
              gsap.to(subtextRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.8,
                ease: 'power3.out',
              })
            } else {
              // Fallback CSS
              subtextRef.current.style.transition = 'opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s'
              subtextRef.current.style.transform = 'translateY(0)'
              setTimeout(() => {
                if (subtextRef.current) {
                  subtextRef.current.style.opacity = '1'
                }
              }, 850)
            }
          } else {
            subtextRef.current.style.opacity = '1'
            subtextRef.current.style.transform = 'translateY(0)'
          }
        }

        // Animate CTA buttons
        if (ctaRef.current && ctaRef.current.children.length > 0) {
          const buttons = Array.from(ctaRef.current.children) as HTMLElement[]
          if (!prefersReducedMotion) {
            if (gsap) {
              gsap.to(buttons, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 1.2,
                stagger: 0.1,
                ease: 'power3.out',
              })
            } else {
              // Fallback CSS
              buttons.forEach((btn, index) => {
                btn.style.transition = `opacity 0.6s ease-out ${1.2 + index * 0.1}s, transform 0.6s ease-out ${1.2 + index * 0.1}s`
                btn.style.transform = 'translateY(0)'
                setTimeout(() => {
                  btn.style.opacity = '1'
                }, 1250 + index * 100)
              })
            }
          } else {
            buttons.forEach(btn => {
              btn.style.opacity = '1'
              btn.style.transform = 'translateY(0)'
            })
          }
        }

        // Animate trust items
        if (trustRef.current && trustRef.current.children.length > 0) {
          const items = Array.from(trustRef.current.children) as HTMLElement[]
          if (!prefersReducedMotion) {
            if (gsap) {
              gsap.to(items, {
                opacity: 1,
                x: 0,
                duration: 0.6,
                delay: 1.6,
                stagger: 0.1,
                ease: 'power3.out',
              })
            } else {
              // Fallback CSS
              items.forEach((item, index) => {
                item.style.transition = `opacity 0.6s ease-out ${1.6 + index * 0.1}s, transform 0.6s ease-out ${1.6 + index * 0.1}s`
                item.style.transform = 'translateX(0)'
                setTimeout(() => {
                  item.style.opacity = '1'
                }, 1650 + index * 100)
              })
            }
          } else {
            items.forEach(item => {
              item.style.opacity = '1'
              item.style.transform = 'translateX(0)'
            })
          }
        }
      } catch (error) {
        console.error('Animation error:', error)
        // Fallback: show all elements immediately
        if (headlineRef.current) {
          const spans = headlineRef.current.querySelectorAll('.hero-word')
          if (spans.length > 0) {
            spans.forEach(span => {
              (span as HTMLElement).style.opacity = '1'
              ;(span as HTMLElement).style.transform = 'translateY(0)'
            })
          } else {
            // If no spans, just show the text directly
            headlineRef.current.textContent = content.headline || 'Logistics that moves your business forward'
            headlineRef.current.style.opacity = '1'
          }
        }
        if (subtextRef.current) {
          subtextRef.current.style.opacity = '1'
          subtextRef.current.style.transform = 'translateY(0)'
        }
        if (ctaRef.current) {
          Array.from(ctaRef.current.children).forEach(btn => {
            (btn as HTMLElement).style.opacity = '1'
            ;(btn as HTMLElement).style.transform = 'translateY(0)'
          })
        }
        if (trustRef.current) {
          Array.from(trustRef.current.children).forEach(item => {
            (item as HTMLElement).style.opacity = '1'
            ;(item as HTMLElement).style.transform = 'translateX(0)'
          })
        }
      }
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(animateElements, 150)
    
    // Add a safety timeout to ensure elements are visible even if animations fail
    const safetyTimer = setTimeout(() => {
      if (headlineRef.current) {
        const spans = headlineRef.current.querySelectorAll('.hero-word')
        if (spans.length > 0) {
          spans.forEach(span => {
            const el = span as HTMLElement
            if (el.style.opacity === '0' || parseFloat(el.style.opacity) < 0.1) {
              el.style.opacity = '1'
              el.style.transform = 'translateY(0)'
            }
          })
        } else if (!headlineRef.current.textContent?.trim()) {
          headlineRef.current.textContent = content.headline || 'Logistics that moves your business forward'
          headlineRef.current.style.opacity = '1'
        }
      }
      if (subtextRef.current && (subtextRef.current.style.opacity === '0' || parseFloat(subtextRef.current.style.opacity) < 0.1)) {
        subtextRef.current.style.opacity = '1'
        subtextRef.current.style.transform = 'translateY(0)'
      }
      if (ctaRef.current) {
        Array.from(ctaRef.current.children).forEach(btn => {
          const el = btn as HTMLElement
          if (el.style.opacity === '0' || parseFloat(el.style.opacity) < 0.1) {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }
        })
      }
      if (trustRef.current) {
        Array.from(trustRef.current.children).forEach(item => {
          const el = item as HTMLElement
          if (el.style.opacity === '0' || parseFloat(el.style.opacity) < 0.1) {
            el.style.opacity = '1'
            el.style.transform = 'translateX(0)'
          }
        })
      }
    }, 3000) // 3 second safety timeout

    return () => {
      clearTimeout(timer)
      clearTimeout(safetyTimer)
    }
  }, [isMounted, gsapLoaded, content])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20">
      {/* Hero Background Image or Gradient */}
      {content.heroImage ? (
        <div className="absolute inset-0">
          <OptimizedImage
            src={content.heroImage}
            alt="Hero background"
            fill
            className="object-cover opacity-20"
            priority
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-white/80 to-amber-50/80" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50" />
      )}
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} 
        />
      </div>

      {/* Decorative Shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      
      {/* Animated Route Lines (Logistics Theme) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-1/4 left-0 w-full h-1/2 opacity-10" style={{ zIndex: 1 }}>
          <path
            d="M 0 100 Q 200 50, 400 100 T 800 100 T 1200 100"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary-600"
            style={{
              strokeDasharray: '5,5',
              animation: 'dash 20s linear infinite',
            }}
          />
        </svg>
        <svg className="absolute bottom-1/4 left-0 w-full h-1/2 opacity-10" style={{ zIndex: 1 }}>
          <path
            d="M 0 200 Q 300 150, 600 200 T 1200 200"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-orange-600"
            style={{
              strokeDasharray: '5,5',
              animation: 'dash 25s linear infinite reverse',
            }}
          />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-8">
              <span className="w-2 h-2 bg-primary-600 rounded-full mr-2 animate-pulse" />
              Trusted Logistics Partner
            </div>

            {/* Main Headline with Animated Logistics Icons */}
            <div className="relative mb-8">
              <h1
                ref={headlineRef}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-navy-900 leading-[1.1] tracking-tight min-h-[1.2em] relative z-10"
              >
                {/* Text will be inserted by animation */}
              </h1>
              
              {/* Animated Logistics Icons Around Headline */}
              <div ref={logisticsIconsRef} className="absolute inset-0 pointer-events-none overflow-visible">
                {/* Top Left - Truck */}
                <div className="logistics-icon absolute -top-8 -left-8 sm:-left-12 lg:-left-16 opacity-0">
                  <div className="bg-primary-100 rounded-full p-3 shadow-lg">
                    <Truck className="text-primary-600" size={24} />
                  </div>
                </div>
                
                {/* Top Right - Package */}
                <div className="logistics-icon absolute -top-6 -right-6 sm:-right-10 lg:-right-14 opacity-0">
                  <div className="bg-orange-100 rounded-full p-3 shadow-lg">
                    <Package className="text-orange-600" size={24} />
                  </div>
                </div>
                
                {/* Bottom Left - Map Pin */}
                <div className="logistics-icon absolute -bottom-6 left-4 sm:left-8 lg:left-12 opacity-0">
                  <div className="bg-amber-100 rounded-full p-3 shadow-lg">
                    <MapPin className="text-amber-600" size={20} />
                  </div>
                </div>
                
                {/* Bottom Right - Zap/Speed */}
                <div className="logistics-icon absolute -bottom-8 right-8 sm:right-12 lg:right-16 opacity-0">
                  <div className="bg-primary-100 rounded-full p-3 shadow-lg">
                    <Zap className="text-primary-600" size={20} />
                  </div>
                </div>
                
                {/* Center Right - Arrow (moving) */}
                <div className="logistics-icon absolute top-1/2 -right-12 sm:-right-16 lg:-right-20 opacity-0">
                  <div className="bg-white rounded-full p-2 shadow-lg border-2 border-primary-200">
                    <ArrowRight className="text-primary-600" size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Subheadline */}
            <p
              ref={subtextRef}
              className="text-lg sm:text-xl lg:text-2xl text-navy-600 mb-12 max-w-3xl mx-auto leading-relaxed"
              style={{ opacity: 0 }}
            >
              {content.subtext}
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button href="/get-quote" variant="primary" size="lg" style={{ opacity: 0 }} className="shadow-lg hover:shadow-xl transition-shadow">
                {content.ctaPrimary || 'Request a Quote'}
              </Button>
              <Button href="/contact" variant="outline" size="lg" style={{ opacity: 0 }} className="border-2">
                {content.ctaSecondary || 'Talk to Dispatch'}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div
              ref={trustRef}
              className="flex flex-wrap items-center justify-center gap-8 text-sm sm:text-base"
            >
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/60 backdrop-blur-sm border border-navy-100" style={{ opacity: 0 }}>
                  <Check size={18} className="text-primary-600 flex-shrink-0" />
                  <span className="text-navy-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-navy-100">
              <div className="text-4xl font-display font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-navy-600 font-medium">Support Available</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-navy-100">
              <div className="text-4xl font-display font-bold text-primary-600 mb-2">50+</div>
              <div className="text-navy-600 font-medium">States Covered</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-navy-100">
              <div className="text-4xl font-display font-bold text-primary-600 mb-2">100%</div>
              <div className="text-navy-600 font-medium">Verified Carriers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
    </section>
  )
}
