type AuthorType = {
  id: string
  name: string
  profile_image_url: string
}

export type PostsType = {
  id: string
  content: string
  author: AuthorType
  createdAt: string
  layoutId: string
}
