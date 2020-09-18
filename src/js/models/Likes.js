export default class Likes {
  constructor() {
    this.likes = [];
  }

  add_like(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);

    // Persist the data in localStorage
    this.persist_data();
    return like;
  }

  delete_like(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1)

    // Persist the data in localStorage
    this.persist_data();
  }

  is_liked(id) {
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  get_number_likes() {
    return this.likes.length;
  }

  persist_data() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  read_storage() {
    const storage = JSON.parse(localStorage.getItem('likes'));
    // Re-store likes from localStorage
    if (storage) this.likes = storage;
  }
}
