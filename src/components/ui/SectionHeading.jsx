import { cn } from '@/lib/cn'
import GradientText from './GradientText'

export default function SectionHeading({ children, className, ...props }) {
  return (
    <h2 className={cn('mb-16 text-center text-4xl font-bold', className)} {...props}>
      <GradientText>{children}</GradientText>
    </h2>
  )
}
