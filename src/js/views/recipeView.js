import { element } from './base';
import { Fraction } from 'fractional';

export const clear_recipe = () => {
  element.recipe.innerHTML = '';
};

const format_count = count => {
  if (count) {
    // count = 2.5  => 2 1/2
    // count = 0.5  => 1/2
    const new_count = Math.round(count * 10000) / 10000;
    const [int, dec] = new_count.toString().split('.').map(el => parseInt(el, 10));


    if (!dec) return new_count;

    if (int === 0) {
      const fr = new Fraction(new_count);
      return `${fr.numerator}/${fr.denominator}`;
    } else {
      const fr = new Fraction(new_count - int)
      return `${int} ${fr.numerator}/${fr.denominator}`;
    }
  }
  return '?';
};
const create_ingredient = ingredient => `
  <li class="recipe__item">
      <svg class="recipe__icon">
          <use href="img/icons.svg#icon-check"></use>
      </svg>
      <div class="recipe__count">${format_count(ingredient.count)}</div>
      <div class="recipe__ingredient">
          <span class="recipe__unit">${ingredient.unit}</span>
          ${ingredient.ingredient}
      </div>
  </li>
`;
export const render_recipe = (recipe, is_liked) => {
  const markup = `
  <figure class="recipe__fig">
      <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
      <h1 class="recipe__title">
          <span>${recipe.title}</span>
      </h1>
  </figure>

  <div class="recipe__details">
      <div class="recipe__info">
          <svg class="recipe__info-icon">
              <use href="img/icons.svg#icon-stopwatch"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
          <span class="recipe__info-text"> minutes</span>
      </div>
      <div class="recipe__info">
          <svg class="recipe__info-icon">
              <use href="img/icons.svg#icon-man"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
          <span class="recipe__info-text"> servings</span>

          <div class="recipe__info-buttons">
              <button class="btn-tiny btn-decrease">
                  <svg>
                      <use href="img/icons.svg#icon-circle-with-minus"></use>
                  </svg>
              </button>
              <button class="btn-tiny btn-increase">
                  <svg>
                      <use href="img/icons.svg#icon-circle-with-plus"></use>
                  </svg>
              </button>
          </div>

      </div>
      <button class="recipe__love">
          <svg class="header__likes">
              <use href="img/icons.svg#icon-heart${is_liked ? '' : '-outlined'}"></use>
          </svg>
      </button>
  </div>



  <div class="recipe__ingredients">
      <ul class="recipe__ingredient-list">
          ${recipe.ingredients.map(el => create_ingredient(el)).join('')}

      </ul>

      <button class="btn-small recipe__btn recipe__btn--add">
          <svg class="search__icon">
              <use href="img/icons.svg#icon-shopping-cart"></use>
          </svg>
          <span>Add to shopping list</span>
      </button>
  </div>

  <div class="recipe__directions">
      <h2 class="heading-2">How to cook it</h2>
      <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
      </p>
      <a class="btn-small recipe__btn" href="${recipe.source}" target="_blank">
          <span>Directions</span>
          <svg class="search__icon">
              <use href="img/icons.svg#icon-triangle-right"></use>
          </svg>

      </a>
  </div>

  `;
  element.recipe.insertAdjacentHTML('afterbegin', markup);
};

export const update_servings_ing = recipe => {
  // Update servings
  document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

  // Update ingredient
  const count_elements = Array.from(document.querySelectorAll('.recipe__count'));
  count_elements.forEach((el, i) => {
    el.textContent = format_count(recipe.ingredients[i].count)
  });

};







///
