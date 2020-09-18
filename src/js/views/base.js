
export const element = {
  search_form: document.querySelector('.search'),
  search_input: document.querySelector('.search__field'),
  search_res: document.querySelector('.results'),
  search_result_list: document.querySelector('.results__list'),
  search_result_pages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shopping: document.querySelector('.shopping__list'),
  likes_menu: document.querySelector('.likes__field'),
  likes_list: document.querySelector('.likes__list')
};
export const element_strings = {
  loader: 'loader'
};
export const render_loader = parent => {
  const loader = `
    <div class="${element_strings.loader}">
      <svg>
          <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
};


export const clear_loader = () => {
  const loader = document.querySelector(`.${element_strings.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};
//
