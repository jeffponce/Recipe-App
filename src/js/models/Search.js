


//const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
import axios from 'axios';

export default class Search {
  constructor(query){
    this.query = query;
  }

  async get_results() {

    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
      this.result = res.data.recipes;
      //console.log(this.result);
    } catch (error) {
      alert(error);
    }
  }
}




//
