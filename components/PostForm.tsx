"use client"
import { useState, useEffect } from "react"
import useSubmitPost from "@/hook/useSubmitPost"
import { useUser } from "@clerk/nextjs/app-beta/client"
import { motion } from "framer-motion"
import SubmitButton from "./SubmitButton"

const PostForm = () => {
  const [content, setContent] = useState("")
  const [postError, setPostError] = useState("")
  const { user } = useUser()
  const mutation = useSubmitPost()

  const submitPost = async () => {
    mutation.mutate({
      content,
      author: {
        name: user?.fullName,
        profile_image_url: user?.profileImageUrl,
        id: user?.id,
      },
      likes: [],
      id: crypto.randomUUID(),
      layoutId: crypto.randomUUID(),
    })
  }

  useEffect(() => {
    if (mutation.isError) {
      const error = mutation.error as Error
      setPostError(error.message)
    }
    if (mutation.isSuccess) {
      setContent("")
      setPostError("")
    }
  }, [mutation.isError, mutation.isSuccess])

  return (
    <motion.form
      className="relative rounded-lg"
      onSubmit={(e) => {
        e.preventDefault()
        submitPost()
      }}
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={`resize-none rounded-lg p-6 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-black-200 w-full  border-transparent  ${
          postError && "placeholder-red-600"
        } `}
        placeholder={mutation.isError ? postError : "What's on your mind?"}
        rows={3}
        maxLength={300}
      />

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </motion.form>
  )
}
export default PostForm
