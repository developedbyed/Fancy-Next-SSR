"use client"
import { SignInButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

function Header() {
  const { isLoaded, isSignedIn, user } = useUser()
  console.log(isLoaded)

  return (
    <header>
      <nav className="flex justify-between items-center py-12">
        <Link href="/">
          <h1>Buzz ⚡</h1>
        </Link>
        <ul className="flex items-center gap-12">
          {isSignedIn && (
            <motion.div
              animate={{ scale: 1, opacity: 1 }}
              initial={{ scale: 0.5, opacity: 0 }}
            >
              <Image
                alt="profile"
                src={user.profileImageUrl}
                width={32}
                height={32}
                className="rounded-full"
              />
            </motion.div>
          )}

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
