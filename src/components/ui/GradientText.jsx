import { cn } from '@/lib/cn'

export default function GradientText({ children, className, ...props }) {
  return (
    <Tag className={cn('bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent', className)} {...props}>
      {children}
    </Tag>
  )
}
