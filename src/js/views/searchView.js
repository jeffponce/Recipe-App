
import {element} from './base';

export const get_input = () => element.search_input.value;

export const clear_input = () => {
  element.search_input.value = '';
};

export const clear_results = () => {
  element.search_result_list.innerHTML = '';
  element.search_result_pages.innerHTML = '';
};

export const highlight_selected = id => {
  const results_array = Array.from(document.querySelectorAll('.results__link'));

  results_array.forEach(el  => {
    el.classList.remove('results__link--active');
  });
  document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
};

// Used to limit char on title UI
export const limit_recipe_title = (title, limit = 17) => {
  const new_title = []
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        new_title.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${new_title.join(' ')} ...`;
  }
  return title;
};

const render_recipe = recipe => {
  const markup = `
    <li>
      <a class="results__link results__link--active" href="#${recipe.recipe_id}">
          <figure class="results__fig">
              <img src="${recipe.image_url}" alt="${recipe.title}">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limit_recipe_title(recipe.title)}</h4>
              <p class="results__author">${recipe.publisher}</p>
          </div>
      </a>
    </li>
  `;

  element.search_result_list.insertAdjacentHTML('beforeend', markup);

};

const create_button = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
  <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
      </svg>
  </button>
  `;

const render_buttons = (page, number_results, result_per_page) => {
  const pages = Math.ceil(number_results / result_per_page);

  let button;
  if (page === 1 && pages > 1) {
    button = create_button(page, 'next')
  } else if (page < pages) {
    button = `
        ${create_button(page, 'prev')}
        ${create_button(page, 'next')}
      `;
  } else if (page === pages && pages > 1) {
    button = create_button(page, 'prev')
  }
  element.search_result_pages.insertAdjacentHTML('afterbegin', button);
};

export const render_results = (recipes, page = 1, result_per_page = 10) => {
  //Render Results of current pages

  const start = (page - 1) * result_per_page;
  const end = page * result_per_page;

  recipes.slice(start, end).forEach(render_recipe);

  //render pagination box
  render_buttons(page, recipes.length, result_per_page)
};







//
