import postsJSON from './assets/posts.json'

export default class PostManager {
  constructor() {
  }

  static get latest() {
    return postsJSON[0]
  }

}