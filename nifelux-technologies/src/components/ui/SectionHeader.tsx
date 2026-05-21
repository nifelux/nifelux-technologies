interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  titleClassName?: string
}

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', titleClassName = '' }: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-syne font-semibold uppercase tracking-[0.2em] text-nfx-blue">
          <span className="h-px w-6 bg-nfx-blue" />{eyebrow}<span className="h-px w-6 bg-nfx-blue" />
        </span>
      )}
      <h2 className={`font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-nfx-white leading-tight ${titleClassName}`}>{title}</h2>
      {subtitle && (
        <p className={`text-nfx-slate text-base md:text-lg leading-relaxed ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>{subtitle}</p>
      )}
    </div>
  )
}
