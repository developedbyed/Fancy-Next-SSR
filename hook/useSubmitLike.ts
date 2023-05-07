import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useUser } from "@clerk/nextjs"
import { PostsType } from "@/types/PostsType"

const useSubmitLike = () => {
  const { user } = useUser()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (postId: string) => {
      const res = await fetch("/api/add-like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error)
      }

      return data
    },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] })
      const prevPost = queryClient.getQueryData(["posts"])
      queryClient.setQueryData(["posts"], (old: any) => {
        return old.map((post: PostsType) => {
          if (post.id === postId) {
            const userHasLiked = post.likes.find(
              (like) => like.authorId === user?.id
            )
            if (userHasLiked) {
              return {
                ...post,
                likes: post.likes.filter((like) => like.authorId !== user?.id),
              }
            } else {
              return {
                ...post,
                likes: [
                  ...post.likes,
                  {
                    id: crypto.randomUUID(),
                    authorId: user?.id,
                    postId: postId,
                  },
                ],
              }
            }
          }
          return post
        })
      })
      return { prevPost }
    },
    onError: async (context: any) => {
      // Revert the specific post to its previous state
      await queryClient.setQueryData(["posts"], context.prevPost)
    },
    onSettled: async () => {
      // Invalidate the specific post
      queryClient.invalidateQueries(["posts"])
    },
  })
  return mutation
}

export default useSubmitLike
