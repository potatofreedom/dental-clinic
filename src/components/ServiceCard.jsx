import { Link } from 'react-router-dom'

export default function ServiceCard({ direction }) {
  return (
    <Link
      to={`/services/${direction.slug}`}
      className="group block bg-surface border border-border rounded-2xl p-8 md:p-10 h-full hover:bg-surface-alt hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
    >
      {/* Background number */}
      <span className="absolute -right-4 -top-6 font-heading text-[120px] leading-none text-accent/[0.06] select-none pointer-events-none">
        {direction.number}
      </span>

      <span className="font-heading text-3xl md:text-4xl text-accent-soft block mb-4">
        {direction.number}
      </span>
      <h3 className="font-heading text-2xl md:text-3xl text-text mb-3">
        {direction.title}
      </h3>
      <p className="text-text-muted text-sm leading-relaxed mb-5">
        {direction.short}
      </p>

      {/* Sub-service tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {direction.subServices.map((sub) => (
          <span
            key={sub.title}
            className="text-xs text-accent bg-accent/[0.08] rounded-full px-3 py-1"
          >
            {sub.title}
          </span>
        ))}
      </div>

      <span className="inline-block text-primary text-lg group-hover:translate-x-2 transition-transform duration-200">
        &rarr;
      </span>
    </Link>
  )
}
