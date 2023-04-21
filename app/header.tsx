"use client"
import { SignInButton, UserButton } from "@clerk/nextjs"
import { SignedIn, SignedOut } from "@clerk/nextjs/app-beta/client"
import Link from "next/link"

function Header() {
  return (
    <header>
      <nav className="flex justify-between items-center py-12">
        <Link href="/">
          <h1>Clerk edge ⚡</h1>
        </Link>
        <ul className="flex items-center gap-12">
          <Link href="/dashboard">courses</Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button>Sign In</button>
            </SignInButton>
          </SignedOut>
        </ul>
      </nav>
    </header>
  )
}

export default Header
