import type { Comment } from "./Comment.ts"
import type { User } from "./User.ts"

export type Post = {
  id: string,
  image: string,
  description: string,
  user: User,
  date: Date,
  comments: Array<Comment>,
  likes: Array<User>
}