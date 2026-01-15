import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  background?: 'white' | 'gray' | 'navy'
}

const paddingClasses = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-20',
  lg: 'py-20 sm:py-24',
  xl: 'py-24 sm:py-32',
}

const backgroundClasses = {
  white: 'bg-white',
  gray: 'bg-navy-50',
  navy: 'bg-navy-900 text-white',
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, padding = 'md', background = 'white' }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          paddingClasses[padding],
          backgroundClasses[background],
          className
        )}
      >
        {children}
      </section>
    )
  }
)

Section.displayName = 'Section'
