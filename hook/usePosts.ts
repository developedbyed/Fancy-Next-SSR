import { useQuery } from "@tanstack/react-query"
import { PostsType } from "@/types/PostsType"

const usePosts = () => {
  return useQuery<PostsType[]>({
    queryKey: ["posts"],
    queryFn: () => fetch("/api/get-feed").then((res) => res.json()),
    staleTime: 1000,
    cacheTime: 1000,
  })
}

export default usePosts
