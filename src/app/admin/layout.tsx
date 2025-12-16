export const dynamic = 'force-dynamic'

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  // This layout forces admin routes to be dynamic, avoiding DB calls during static export
  return <>{children}</>
}
