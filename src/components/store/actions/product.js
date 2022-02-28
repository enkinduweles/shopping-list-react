const FilterProducts = (payload) => {
  return {
    type: 'FILTER_PRODUCTS',
    payload,
  };
};

export { FilterProducts };
