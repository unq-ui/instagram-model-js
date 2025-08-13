import type { DraftComment, DraftPost, DraftUser } from "../Drafts/Drafts.ts";
import { PostException, UserException } from "./Exceptions.ts";

import type { Post } from "./Post.ts";
import type { User } from "./User.ts";

export class InstagramSystem {
  comments: number;
  users: Array<User>;
  posts: Array<Post>;

  constructor() {
    this.users = [];
    this.posts = [];
    this.comments = 0;
  }

  private generateUserId(): string {
    return `user_${this.users.length + 1}`;
  }

  private generateCommentId(): string {
    this.comments++;
    return `comment_${this.comments}`;
  }

  private generatePostId(): string {
    return `post_${this.posts.length + 1}`;
  }

  login(email: string, password: string): User {
    const user = this.users.find(user => user.email === email && user.password === password);
    if (!user) throw new UserException("Invalid email or password");
    return user;
  }

  private validateNewUser(draftUser: DraftUser): void {
    const existingUser = this.users.find(user => user.email === draftUser.email);
    if (existingUser) throw new UserException("User already exists");
  }

  register(draftUser: DraftUser): User {
    this.validateNewUser(draftUser);
    const user: User = {
      ...draftUser,
      id: this.generateUserId(),
      followers: []
    };
    this.users.push(user);
    return user;
  }

  getUser(id: string): User {
    const user = this.users.find(user => user.id === id);
    if (!user) throw new UserException("User not found");
    return user;
  }

  getPost(id: string): Post {
    const post = this.posts.find(post => post.id === id);
    if (!post) throw new PostException("Post not found");
    return post;
  }

  addPost(userId: string, draftPost: DraftPost): Post {
    const user = this.getUser(userId);
    const post: Post = {
      ...draftPost,
      id: this.generatePostId(),
      user,
      comments: [],
      likes: [],
      date: new Date()
    };
    this.posts.push(post);
    return post;
  }

  editPost(id: string, updatedPost: DraftPost): Post {
    const post = this.getPost(id);
    Object.assign(post, updatedPost);
    return post;
  }

  deletePost(id: string): void {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) throw new PostException("Post not found");
    this.posts.splice(postIndex, 1);
  }

  addComment(postId: string, userId: string, comment: DraftComment): Post {
    const user = this.getUser(userId);
    const post = this.getPost(postId);
    post.comments.push({
      ...comment,
      id: this.generateCommentId(),
      user
    });
    return post;
  }

  updateLike(postId: string, userId: string): Post {
    const user = this.getUser(userId);
    const post = this.getPost(postId);
    if (post.likes.includes(user)) {
      post.likes.splice(post.likes.indexOf(user), 1);
      return post;
    }
    post.likes.push(user);
    return post;
  }

  updateFollower(fromUserId: string, toUserId: string): User {
    const fromUser = this.getUser(fromUserId);
    const toUser = this.getUser(toUserId);
    if (fromUser.followers.includes(toUser)) {
      fromUser.followers.splice(fromUser.followers.indexOf(toUser), 1);
    } else {
      fromUser.followers.push(toUser);
    }
    return fromUser;
  }

  searchByTag(tag: string): Array<Post> {
    return this.posts.filter(post => post.description.includes(`#${tag}`)).sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  searchByUserName(name: string): Array<Post> {
    const userIds = this.users.filter(user => user.name.includes(name));
    return this.posts.filter(post => userIds.includes(post.user)).sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  searchByUserId(userId: string): Array<Post> {
    const user = this.getUser(userId);
    return this.posts.filter(post => post.user === user).sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  searchByName(name: string): Array<User> {
    if (!name) return [];
    return this.users.filter(user => user.name.includes(name)).sort((a, b) => a.name.localeCompare(b.name));
  }

  timeline(userId: string): Array<Post> {
    const user = this.getUser(userId);
    return this.posts.filter(post => user.followers.includes(post.user)).sort((a, b) => b.date.getTime() - a.date.getTime());
  }
}
