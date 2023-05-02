import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PostSubmit } from "@/types/PostSubmit"

const useSubmitPost = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ content, author, layoutId, id }: PostSubmit) => {
      const res = await fetch("/api/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, layoutId, author }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error)
      }

      return data
    },
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(["posts"])
      const previousPosts = queryClient.getQueryData(["posts"])

      queryClient.setQueryData(["posts"], (old: any) => [...old, newPost])
      //Set Delay
      await new Promise((resolve) => setTimeout(resolve, 300))
      return { previousPosts }
    },
    onError: async (err, newPost, context: any) => {
      console.log(err + "Error 👎")
      await queryClient.setQueryData(["posts"], context.previousPosts)
    },
    onSuccess: async (data, newPost) => {
      //loop over all the queries and update the cache with the new id

      queryClient.setQueryData(["posts"], (old: any) => {
        return old.map((post: any) => {
          if (post.id === newPost.id) {
            return {
              ...data.post,
              author: { ...data.author },
              id: data.post.id,
            }
          }
          return post
        })
      })
    },
    onSettled: async (data, error, variables, context) => {
      queryClient.invalidateQueries(["posts"])
    },
  })
  return mutation
}

export default useSubmitPost
