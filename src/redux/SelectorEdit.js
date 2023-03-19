const { createSelector } = require("@reduxjs/toolkit");

const cartSelectorEdit = (state) => state.cartEdit;

export const cartTotalSelectorEdit = createSelector([cartSelectorEdit], (cartEdit) =>
cartEdit.reduce((total, current) => (total += current.quantity), 0)
);

export const cartTotalPriceSelector = createSelector([cartSelectorEdit], (cartEdit) =>
cartEdit.reduce(
    (total, current) => (total += current.prix_max * current.quantity),
    0
  )
);
