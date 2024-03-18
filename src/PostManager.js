import postsJSON from './assets/posts.json'

export default class PostManager {
  constructor() {
  }

  static get sortByCreatedAt() {
    return this.sortByCreatedAtAsc
  }

  static get sortByCreatedAtDesc() {
    return postsJSON.sort((a,b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }

  static get sortByCreatedAtAsc() {
    return this.sortByCreatedAtDesc.reverse();
  }

  static find(id) {
    if (!id) return
    return postsJSON.find(post => post.id === Number(id))
  }

  static get last() {
    return this.sortByCreatedAt[postsJSON.length - 1]
  }

  static get first() {
    return this.sortByCreatedAt[0]
  }

}