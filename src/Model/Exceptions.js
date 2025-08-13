export class UserException extends Error {
  constructor(msg) {
    super(msg);
    this.name = "UserException";
  }
}

export class PostException extends Error {
  constructor(msg) {
    super(msg);
    this.name = "PostException";
  }
}