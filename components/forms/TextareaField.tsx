'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  helperText?: string
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const fieldId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`

    return (
      <div className="space-y-2">
        <label
          htmlFor={fieldId}
          className="block text-sm font-semibold text-navy-900"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          ref={ref}
          id={fieldId}
          rows={4}
          className={cn(
            'w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical',
            error
              ? 'border-red-300 bg-red-50'
              : 'border-navy-300 bg-white hover:border-navy-400',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${fieldId}-error`} className="text-sm text-red-600">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${fieldId}-helper`} className="text-sm text-navy-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

TextareaField.displayName = 'TextareaField'
