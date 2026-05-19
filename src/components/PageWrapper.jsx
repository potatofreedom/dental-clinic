export default function PageWrapper({ children, className = '' }) {
  return (
    <main className={className}>
      {children}
    </main>
  )
}
