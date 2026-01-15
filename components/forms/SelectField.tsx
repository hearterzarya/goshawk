'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  helperText?: string
  options: { value: string; label: string }[]
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, helperText, className, id, options, ...props }, ref) => {
    const fieldId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`

    return (
      <div className="space-y-2">
        <label
          htmlFor={fieldId}
          className="block text-sm font-semibold text-navy-900"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
          ref={ref}
          id={fieldId}
          className={cn(
            'w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white',
            error
              ? 'border-red-300 bg-red-50'
              : 'border-navy-300 hover:border-navy-400',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined}
          {...props}
        >
          {!props.value && <option value="">Select an option</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

SelectField.displayName = 'SelectField'
