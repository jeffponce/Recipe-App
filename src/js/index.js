// Global app controller
import {element, render_loader, clear_loader} from './views/base';
import * as search_view from './views/searchView';
import * as recipe_view from './views/recipeView';
import * as list_view from './views/listView';
import * as likes_view from './views/likesView';
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';


/** Global State of the App*
* - Search Object
* - Current Recipe Object
* - Shopping List
* - Liked Recipes
*/
const state = {};

/** Search Controller **/

const control_search = async () => {
  // 1. Get query from view
  const query = search_view.get_input();

  if (query) {
    // 2. New search object and add to State
    state.search = new Search(query);

    // 3. Prepare UI for Results
    search_view.clear_input();
    search_view.clear_results();
    render_loader(element.search_res);

    try {
      // 4. Search for recipes
      await state.search.get_results();

      // 5. Results to UI
      clear_loader();
      search_view.render_results(state.search.result);
    } catch (error) {
      alert('Something went wrong with the search')
      clear_loader();
    }
  }
}

element.search_form.addEventListener('submit', e => {
  e.preventDefault();
  control_search();
});


element.search_result_pages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goto_page = parseInt(btn.dataset.goto, 10);
    search_view.clear_results();
    search_view.render_results(state.search.result, goto_page);
  }
});



/** Recipe Controller **/
const control_recipe = async () => {
  // Get ID from URL
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Prepare UI for Changes
    recipe_view.clear_recipe();
    render_loader(element.recipe);

    // Highlight selected search item
    if (state.search) search_view.highlight_selected(id);

    // Create new recipe Object
    state.recipe = new Recipe(id);

    try {
      // Get Recipe dataset and parse ingredients
      await state.recipe.get_recipe();
      state.recipe.parse_ingredients();

      // Calc serving and time to cook
      state.recipe.calc_servings();
      state.recipe.calc_time();

      // Render Recipe
      clear_loader();
      recipe_view.render_recipe(
        state.recipe,
        state.likes.is_liked(id)
      );
    } catch (error) {
      alert('Error in rendering the recipe')
    }
  }
};
//window.addEventListener('hashchange', control_recipe);
//window.addEventListener('load', control_recipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, control_recipe));


/** List Controller **/
const control_list = () => {
  // Create a new list if there is none yet
  if (!state.list) state.list = new List();

  // Add each ingredient to the list and UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.add_item(el.count, el.unit, el.ingredient);
    list_view.render_item(item);
  });
}

// Handle Delete and update list item events

element.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  //handle the delete buttons
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // Delete from State
    state.list.delete_item(id);

    // Delete from UI
    list_view.delete_item(id);

  // Handle the count update
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10);
    state.list.update_count(id, val);
  }
});

/** Like Controller **/

const control_like = () => {
  if (!state.likes) state.likes = new Likes();

  const current_id = state.recipe.id;

  //User has not liked current recipe
  if (!state.likes.is_liked(current_id)) {
    // add like to the State
    const new_like = state.likes.add_like(
      current_id,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img,
    );

    // toggle the like button
    likes_view.toggle_like_button(true);
    // add like to UI list
    likes_view.render_like(new_like);

  //User has not liked current recipe
  } else {
    // remove like to the State
    state.likes.delete_like(current_id);

    // toggle the like button
    likes_view.toggle_like_button(false);
    // Remove like to UI list
    likes_view.delete_like(current_id);

  }
  likes_view.toggle_like_menu(state.likes.get_number_likes());
};

// Re-store liked recipes on pageload
window.addEventListener('load', () => {
  state.likes = new Likes();
  // Restore likes
  state.likes.read_storage();

  // Toggle button
  likes_view.toggle_like_menu(state.likes.get_number_likes());

  // Render the existing likesView
  state.likes.likes.forEach(like => likes_view.render_like(like))
});


// Handling Recipe Button Clicks
element.recipe.addEventListener('click', e => {
  if(e.target.matches('.btn-decrease, .btn-decrease *')) {
    //decrease btn clicked
    if (state.recipe.servings > 1) {
      state.recipe.update_servings('dec');
      recipe_view.update_servings_ing(state.recipe);
      console.log(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    //increase btn clicked
    state.recipe.update_servings('inc');
    recipe_view.update_servings_ing(state.recipe);
    console.log(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // add ingredient to list
    control_list();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    // Like controller
    control_like();
  }
});








//
