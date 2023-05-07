"use client"
import { SignInButton, useUser, UserButton } from "@clerk/nextjs"
import Link from "next/link"

function Header() {
  const { isSignedIn } = useUser()

  return (
    <header>
      <nav className="flex justify-between items-center py-12">
        <Link href="/">
          <h1>Buzz ⚡</h1>
        </Link>
        <ul className="flex items-center gap-12">
          {isSignedIn && <UserButton />}
          {!isSignedIn && (
            <SignInButton mode="modal">
              <button>Sign In</button>
            </SignInButton>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
