"use client"
import { SignInButton } from "@clerk/nextjs/"

const SignIn = () => {
  return (
    <>
      <SignInButton mode="modal">
        <button className="inline-block py-2 px-4 text-blue-600">
          Sign In
        </button>
      </SignInButton>
    </>
  )
}

export default SignIn
