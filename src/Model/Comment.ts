import type { User } from "./User.ts"

export type Comment = {
  id: string,
  body: string,
  user: User,
}