import { Link } from 'react-router-dom'

export default function ServiceCard({ service }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group block bg-surface border border-border rounded-2xl p-6 md:p-8 h-full hover:bg-surface-alt hover:-translate-y-1 transition-all duration-300"
    >
      <span className="font-heading text-3xl md:text-4xl text-accent-soft block mb-6">
        {service.number}
      </span>
      <h3 className="font-heading text-xl md:text-2xl text-text mb-3">
        {service.title}
      </h3>
      <p className="text-text-muted text-sm leading-relaxed mb-6 line-clamp-2">
        {service.short}
      </p>
      <span className="inline-block text-primary text-lg group-hover:translate-x-1 transition-transform duration-200">
        &rarr;
      </span>
    </Link>
  )
}
