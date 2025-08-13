export class Post {
  constructor(id, image, description, user, date, comments, likes) {
    this.id = id;
    this.image = image;
    this.description = description;
    this.user = user;
    this.date = date;
    this.comments = comments;
    this.likes = likes;
  }
}