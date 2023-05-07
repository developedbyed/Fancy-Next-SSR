type AuthorType = {
  id: string
  name: string
  profile_image_url: string
}
type LikesType = {
  id: string
  postId: string
  authorId: string
  createdAt: string
}

export type PostsType = {
  id: string
  content: string
  author: AuthorType
  likes: LikesType[]
  createdAt: string
  layoutId: string
}
