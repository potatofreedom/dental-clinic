export default function SectionHeading({ number, title, className = '' }) {
  return (
    <div className={`mb-12 ${className}`}>
      {number && (
        <span className="font-body text-xs uppercase tracking-[0.15em] text-text-muted mb-3 block">
          {number} / {title}
        </span>
      )}
      <h2 className="font-heading text-4xl md:text-5xl text-text">{title}</h2>
    </div>
  )
}
