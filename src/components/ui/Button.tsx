'use client'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'
type Variant = 'primary'|'secondary'|'danger'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?:Variant; size?:'sm'|'md'|'lg'; href?:string; loading?:boolean; children:React.ReactNode }
const variants = { primary:'bg-gradient-to-r from-nfx-blue-dark to-nfx-blue text-white hover:shadow-[0_8px_32px_rgba(59,130,246,0.4)] hover:-translate-y-0.5', secondary:'bg-transparent text-nfx-white border border-white/15 hover:border-nfx-blue/50 hover:bg-nfx-blue/10 hover:-translate-y-0.5', danger:'bg-gradient-to-r from-red-700 to-nfx-red text-white hover:-translate-y-0.5' }
const sizes = { sm:'px-4 py-2 text-sm', md:'px-7 py-3 text-sm', lg:'px-8 py-4 text-base' }
const Button = forwardRef<HTMLButtonElement,ButtonProps>(({ variant='primary', size='md', href, loading=false, children, className='', disabled, ...props }, ref) => {
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl font-syne font-semibold tracking-wide transition-all duration-200 disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button ref={ref} className={cls} disabled={disabled||loading} {...props}>{loading?<><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"/>Processing...</>:children}</button>
})
Button.displayName = 'Button'
export default Button
