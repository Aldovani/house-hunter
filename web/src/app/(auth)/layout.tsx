import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="mx-auto w-full min-h-screen flex justify-between">
      <div className="pl-16 mt-5 w-full">
        <Link className="text-indigo-700 text-2xl font-semibold" href="/">
          House-Hunter
        </Link>

        <div className="pl-24 pr-20 mt-16">{children}</div>
      </div>

      <div className="bg-auth bg-cover bg-no-repeat w-full"></div>
    </main>
  )
}
