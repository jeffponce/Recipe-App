import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  add_item(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    }
    this.items.push(item);
    return item;
  }

  delete_item(id) {
    const index = this.items.findIndex(el => el.id === id);
    // [2,4,8] splice(1,1) => returns [4], original array is [2,8]
    // [2,4,8] slice(1,1) => returns [4], original array is [2,4,8]
    this.items.splice(index, 1)
  }

  update_count(id, new_count) {
    this.items.find(el => el.id === id).count = new_count;
  }
};






//
