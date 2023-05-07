export type PostSubmit = {
  content: string
  id: string
  layoutId: string
  author: Author
  likes: Likes[]
}
type Author = {
  name: string | null | undefined
  profile_image_url: string | null | undefined
  id: string | null | undefined
}

type Likes = {
  authorId: string | undefined
}
