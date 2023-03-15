const { createSelector } = require("@reduxjs/toolkit");

const cartSelector = (state) => state.cart;

export const cartTotalSelector = createSelector([cartSelector], (cart) =>
  cart.reduce((total, current) => (total += current.quantity), 0)
);

export const cartTotalPriceSelector = createSelector([cartSelector], (cart) =>
  cart.reduce(
    (total, current) => (total += current.prix_max * current.quantity),
    0
  )
);
