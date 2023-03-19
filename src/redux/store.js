import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";
import CartReducerEdit from "./CartReducerEdit";


const store = configureStore({
  reducer: {
    cart: CartReducer,
    cartEdit: CartReducerEdit,
  },
});

export default store;
