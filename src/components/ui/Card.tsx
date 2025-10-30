import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const cardVariants = cva(
  'bg-white rounded-xl border border-gray-200 shadow-sm',
  {
    variants: {
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      shadow: {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
      },
      hover: {
        none: '',
        lift: 'card-hover',
        subtle: 'transition-all duration-200 hover:shadow-md hover:scale-[1.02]',
        glow: 'transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/20 hover:scale-[1.01]',
      },
    },
    defaultVariants: {
      padding: 'md',
      shadow: 'sm',
      hover: 'none',
    },
  }
)

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding, shadow, hover, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cardVariants({ padding, shadow, hover, className })}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export { Card, cardVariants } 