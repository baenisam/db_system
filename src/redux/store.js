import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";

// import productsReducer from "./productsSlice";
// import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: {
    // products: productsReducer,
    cart: CartReducer,
    // ui: uiReducer
  },
});

export default store;
