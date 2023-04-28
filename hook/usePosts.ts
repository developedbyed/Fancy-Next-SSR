import { useQuery } from "@tanstack/react-query"
import { PostsType } from "@/types/PostsType"

const usePosts = () => {
  return useQuery<PostsType[]>({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/get-feed").then((res) => res.json()),
  })
}

export default usePosts
