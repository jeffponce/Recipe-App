
import {element} from './base';
import {limit_recipe_title} from './searchView';

export const toggle_like_button = is_liked => {
  // icons.svg#
  const icon_string = is_liked ? 'icon-heart' : 'icon-heart-outlined';
  document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${icon_string}`);
};


export const toggle_like_menu = number_likes => {
  element.likes_menu.style.visibility = number_likes > 0 ? 'visible' : 'hidden';
};

export const render_like = like => {
  const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limit_recipe_title(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
  `;
  element.likes_list.insertAdjacentHTML('beforeend', markup);
};

export const delete_like = id => {
  const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
  if (el) el.parentElement.removeChild(el);
}





///
