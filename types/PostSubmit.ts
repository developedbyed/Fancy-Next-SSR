export type PostSubmit = {
  content: string
  id: string
  layoutId: string
  author: Author
}
type Author = {
  name: string | null | undefined
  profile_image_url: string | null | undefined
}
