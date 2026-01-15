'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className="border border-navy-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-navy-50 transition-colors"
            >
              <span className="font-semibold text-navy-900 pr-8">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  'flex-shrink-0 text-navy-500 transition-transform duration-200',
                  isOpen && 'transform rotate-180'
                )}
                size={20}
              />
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="p-6 pt-0 text-navy-600">{item.answer}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
