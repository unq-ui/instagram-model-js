export class DraftPost {
  constructor(image, description) {
    this.image = image;
    this.description = description;
  }
}

export class DraftComment {
  constructor(body) {
    this.body = body;
  }
}

export class DraftUser {
  constructor(name, email, password, image) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.image = image;
  }
}