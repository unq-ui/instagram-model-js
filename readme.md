# Instagram Model JS Documentation

## How to use

```typescript
const system = getInstagramSystem();
```

## InstagramSystem

```typescript
class InstagramSystem {
  /**
   * @param {Array<User>} users
   * @param {Array<Post>} posts
   */

  /**
   * Logs in with email and password.
   *
   * @param {string} email The user's email.
   * @param {string} password The user's password.
   * @return {User} The authenticated user.
   * @throws {UserException} If the email or password is incorrect.
   */
  login(email: string, password: string): User
  
  /**
   * Add a new user to the system.
   *
   * @param {DraftUser} user The user to add.
   * @return {User} The newly created user.
   * @throws {UserException} If the email address is already in use.
   */
  register(draftUser: DraftUser): User

  /**
   * Get a user by its ID.
   *
   * @param {string} id The ID of the user.
   * @return {User} The user with the given ID.
   * @throws {UserException} If the user with the given ID does not exist.
   */
  getUser(id: string): User

  /**
   * Get a post by its ID.
   *
   * @param {string} id The ID of the post.
   * @return {Post} The post with the given ID.
   * @throws {PostException} If the post with the given ID does not exist.
   */
  getPost(id: string): Post

  /**
   * Retrieves all posts created by a specific user.
   *
   * @param {string} userId - The ID of the user whose posts are to be retrieved.
   * @returns {Array<Post>} An array of posts created by the specified user.
   * @throws {UserException} If the user with the given ID does not exist.
   */
  getPostByUserId(userId: string): Array<Post>


  /**
   * Adds a new post to the system for a given user.
   *
   * @param {string} userId The ID of the user creating the post.
   * @param {DraftPost} draftPost The draft post data to be added.
   * @return {Post} The newly created post.
   * @throws {UserException} If the user with the given ID does not exist.
   */
  addPost(userId: string, draftPost: DraftPost): Post

  
  /**
   * Edits an existing post with new data.
   *
   * @param {string} id The ID of the post to edit.
   * @param {DraftPost} updatedPost The updated post data.
   * @return {Post} The updated post.
   * @throws {PostException} If the post with the given ID does not exist.
   */
  editPost(id: string, updatedPost: DraftPost): Post

  
  /**
   * Deletes a post from the system by its ID.
   *
   * @param {string} id The ID of the post to delete.
   * @return {void}
   * @throws {PostException} If the post with the given ID does not exist.
   */
  deletePost(id: string): void


  /**
   * Adds a comment to a post.
   *
   * @param {string} postId - The ID of the post to comment on.
   * @param {string} userId - The ID of the user making the comment.
   * @param {DraftComment} comment - The comment data to be added.
   * @returns {Post} The updated post with the new comment.
   * @throws {UserException} If the user with the given ID does not exist.
   * @throws {PostException} If the post with the given ID does not exist.
   */
  addComment(postId: string, userId: string, comment: DraftComment): Post

  /**
   * Updates the like status of a post for a given user.
   * If the user has already liked the post, the like is removed; otherwise, a like is added.
   *
   * @param {string} postId - The ID of the post to like or unlike.
   * @param {string} userId - The ID of the user performing the action.
   * @returns {Post} The updated post with the new like status.
   * @throws {UserException} If the user with the given ID does not exist.
   * @throws {PostException} If the post with the given ID does not exist.
   */
  updateLike(postId: string, userId: string): Post

  /**
   * Updates the follower relationship between two users.
   * If the follower already follows the target user, the follow is removed; otherwise, a follow is added.
   *
   * @param {string} fromUserId - The ID of the user who is following or unfollowing.
   * @param {string} toUserId - The ID of the user to be followed or unfollowed.
   * @returns {User} The updated user with the new followers list.
   * @throws {UserException} If either user does not exist.
   */
  updateFollower(fromUserId: string, toUserId: string): User

  /**
   * Searches for posts containing a specific tag in their description.
   *
   * @param {string} tag - The tag to search for (without the # symbol).
   * @returns {Array<Post>} An array of posts containing the specified tag, sorted by date (newest first).
   */
  searchByTag(tag: string): Array<Post>

  /**
   * Searches for posts by users whose names include the specified string.
   *
   * @param {string} name - The name or partial name to search for.
   * @returns {Array<Post>} An array of posts by users matching the name, sorted by date (newest first).
   */
  searchByUserName(name: string): Array<Post>

  /**
   * Searches for posts by a specific user ID.
   *
   * @param {string} userId - The ID of the user whose posts to retrieve.
   * @returns {Array<Post>} An array of posts by the specified user, sorted by date (newest first).
   * @throws {UserException} If the user with the given ID does not exist.
   */
  searchByUserId(userId: string): Array<Post>

  /**
   * Searches for users whose names include the specified string.
   *
   * @param {string} name - The name or partial name to search for.
   * @returns {Array<User>} An array of users matching the name, sorted alphabetically.
   */
  searchByName(name: string): Array<User>

  /**
   * Retrieves the timeline for a user, consisting of posts from users they follow.
   *
   * @param {string} userId - The ID of the user whose timeline to retrieve.
   * @returns {Array<Post>} An array of posts from followed users, sorted by date (newest first).
   * @throws {UserException} If the user with the given ID does not exist.
   */
  timeline(userId: string): Array<Post>
}
```

## Model

```typescript
type User = {
  id: string,
  name: string,
  email: string,
  password: string,
  image: string,
  followers: Array<User>
}
```

```typescript
type Post = {
  id: string,
  image: string,
  description: string,
  user: User,
  date: Date,
  comments: Array<Comment>,
  likes: Array<User>
}
```

```typescript
type Comment = {
  id: string,
  body: string,
  user: User,
}
```

## Drafts

```typescript
type DraftPost = {
  image: string;
  description: string;
}
```

```typescript
type DraftComment = {
  body: string;
}
```

```typescript
type DraftUser = {
  name: string;
  email: string;
  password: string;
  image: string;
}
```
