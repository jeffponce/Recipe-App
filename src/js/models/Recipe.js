import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async get_recipe() {
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.source = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
      alert('Something went wrong!')
    }
  }
  calc_time() {
    //Assuming for every 3 ingredients we need 15 minutes of time to cook
    const num_ing = this.ingredients.length;
    const periods = Math.ceil(num_ing / 3);
    this.time = periods * 15;
  }

  calc_servings() {
    this.servings = 4;
  }

  parse_ingredients() {
    const units_long = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const units_short = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...units_short, 'kg', 'g']

    const new_ingredients = this.ingredients.map(el => {
      // Uniform units
      let ingredient = el.toLowerCase();
      units_long.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, units_short[i]);
      });

      // Remove parathesis
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // Parse ingredients into count, unit and ingredient
      const array_ingredient = ingredient.split(' ');
      const unit_index = array_ingredient.findIndex(el2 => units.includes(el2));

      let obj_ingredient;

      if (unit_index > -1) {
        // There is a unit
        const array_count = array_ingredient.slice(0, unit_index);

        let count;
        if (array_count.length === 1) {
          count = eval(array_ingredient[0].replace('-', '+'));
        } else {
          count = eval(array_ingredient.slice(0, unit_index).join('+'));
        }

        obj_ingredient = {
          count,
          unit: array_ingredient[unit_index],
          ingredient: array_ingredient.slice(unit_index + 1).join(' ')
        };
      } else if (parseInt(array_ingredient[0], 10)){
        // There is no unit, but 1st element is a number
        obj_ingredient = {
          count: parseInt(array_ingredient[0], 10),
          unit: '',
          ingredient: array_ingredient.slice(1).join(' ')

        }
      } else if (unit_index === -1) {
        // There is no unit and no number in 1st position
        obj_ingredient = {
          count: 1,
          unit: '',
          ingredient
        }
      }
      return obj_ingredient;

    });
    this.ingredients = new_ingredients;
  }

  update_servings (type) {
    // servings
    const new_servings = type === 'dec' ? this.servings -1 : this.servings + 1;

    // ingredient
    this.ingredients.forEach(ing  => {
      ing.count *= (new_servings / this.servings)
    });

    this.servings = new_servings;
  }
}









//
