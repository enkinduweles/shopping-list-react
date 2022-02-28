import productsList from './product';

const INITIAL_STATE = {
  list: productsList,
  filteredList: [],
};

export default function products(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FILTER_PRODUCTS':
      const payload = action.payload;

      const checkedProducts = Object.entries(payload)
        .filter((category) => category[1])
        .map((category) => category[0]);
      const filteredProducts = state.list.filter((category) =>
        checkedProducts.includes(category.name_categorys)
      );

      return { ...state, filteredList: filteredProducts };

    default:
      return state;
  }
}
