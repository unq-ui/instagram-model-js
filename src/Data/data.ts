import Rand from 'rand-seed';

import { InstagramSystem } from '../Model/InstagramSystem.ts';
import { getComments, getPhotos, getUsers, getRandom } from "./utils.ts";

const photos = getPhotos()
const comments = getComments()
const users = getUsers()
const random = new Rand('instagram-system');

const addUsers = (instagramSystem: InstagramSystem) => users.forEach(user => instagramSystem.register(user));

const addPhotos = (instagramSystem: InstagramSystem) => {
  instagramSystem.users.forEach(user => {
    const selectedPhotos = Array.from({ length: 15 }, () => photos[getRandom(random, 1, photos.length - 1)])
    selectedPhotos.forEach(photo => instagramSystem.addPost(user.id, photo))
  })
}

const addFollowers = (instagramSystem: InstagramSystem) => {
  instagramSystem.users.forEach(user => {
    const selectedUsers = Array.from({ length: 15 }, () => instagramSystem.users[getRandom(random, 0, instagramSystem.users.length - 1)].id)
    selectedUsers.forEach(followerId => {
      if (followerId !== user.id) {
        instagramSystem.updateFollower(user.id, followerId);
      }
    });
  });
}

const addComments = (instagramSystem: InstagramSystem) => {
  instagramSystem.posts.forEach(post => {
    const selectedComments = Array.from({ length: 7 }, () => comments[getRandom(random, 0, comments.length - 1)]);
    selectedComments.forEach(comment => {
      const user = instagramSystem.users[getRandom(random, 0, instagramSystem.users.length - 1)];
      instagramSystem.addComment(post.id, user.id, { body: comment } );
    });
  });
}

const addLikes = (instagramSystem: InstagramSystem) => {
  const posts = instagramSystem.posts;
  instagramSystem.users.forEach(user => {
    const selectedPosts = Array.from({ length: 75 }, () => posts[getRandom(random, 0, posts.length - 1)]);
    selectedPosts.forEach(post => {
      instagramSystem.updateLike(post.id, user.id);
    });
  });
}

export const getInstagramSystem = () => {
  const instagramSystem = new InstagramSystem();
  addUsers(instagramSystem);
  addPhotos(instagramSystem);
  addFollowers(instagramSystem);
  addComments(instagramSystem);
  addLikes(instagramSystem);
  return instagramSystem;
}