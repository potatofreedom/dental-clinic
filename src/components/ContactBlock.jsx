import { Link } from 'react-router-dom'

export default function ContactBlock() {
  return (
    <section className="bg-primary rounded-2xl px-8 py-16 md:px-16 md:py-20 text-center">
      <h2 className="font-heading text-3xl md:text-5xl text-white mb-4">
        Готовы начать?
      </h2>
      <p className="text-accent-soft text-lg mb-8 max-w-lg mx-auto">
        Свяжитесь с нами для консультации и записи на приём
      </p>
      <Link
        to="/contacts"
        className="inline-block bg-white text-primary font-medium px-8 py-3.5 rounded-full hover:bg-accent-soft transition-colors duration-200"
      >
        Связаться с нами
      </Link>
    </section>
  )
}
