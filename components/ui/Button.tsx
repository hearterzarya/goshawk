import Link from 'next/link'
import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
}

interface ButtonProps
  extends BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  href?: never
}

interface LinkButtonProps
  extends BaseButtonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'> {
  href: string
}

type Props = ButtonProps | LinkButtonProps

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
  secondary:
    'bg-navy-900 text-white hover:bg-navy-800 focus:ring-navy-500',
  outline:
    'border-2 border-navy-300 text-navy-700 hover:bg-navy-50 focus:ring-navy-500',
  ghost: 'text-navy-700 hover:bg-navy-100 focus:ring-navy-500',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button(props: Props) {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className,
    children,
    ...rest
  } = props

  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    className
  )

  if ('href' in props && props.href) {
    const linkProps = rest as Omit<LinkButtonProps, 'variant' | 'size' | 'fullWidth' | 'className' | 'href'>
    return (
      <Link href={props.href} className={classes} {...linkProps}>
        {children}
      </Link>
    )
  }

  const buttonProps = rest as Omit<ButtonProps, 'variant' | 'size' | 'fullWidth' | 'className'>
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
