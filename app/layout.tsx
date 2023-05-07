import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import Providers from "./providers"
import Header from "./header"

export const metadata = {
  title: "Buzz ⚡",
  description: "Built with Next 13",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className="mx-6 lg:mx-96 bg-black-100 text-white">
            <Header />
            {children}
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  )
}
