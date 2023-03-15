import React from 'react';
import {createSlice} from '@reduxjs/toolkit';
import {GlobalContext} from '../services/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {playPause} from './PlaySound';
import {concat} from 'react-native-reanimated';

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, {payload}, sound) {
      playPause();
      const {id} = payload;
      console.log(payload);

      const find = state.find(item => item.id === id);
      if (find) {
        return state.map(item =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: Number((item.quantity + 1) * item.prix_max),
              }
            : item,
        );
      } else {
        state.push({
          ...payload,
          quantity: 1,
          total: Number(1 * payload.prix_max),
        });
      }
    },
    addToCartToEdit(state, {payload}, sound) {
      const data = payload.map(item => {
        return {
          id_entrep: item.id_entrep,
          id: item.id_produit,
          name: item.designation,
          prix_max: item.prix / item.qte,
          file: null,
          description: null,
          quantity: item.qte,
          total: item.prix,
        };
      });

      for(let i = 0; i < data.length; i++){
        state.push(data[i]);
      }
    },
    addToCartEdit(state, {payload}, sound) {
      playPause();
      const {id} = payload.item;
      console.log(payload.inputs.quantity);

      const find = state.find(item => item.id === id);
      if (find) {
        return state.map(item =>
          item.id === id
            ? {
                ...item,
                quantity:
                  Number(item.quantity) + Number(payload.inputs.quantity),
                total: Math.round(
                  (item.quantity + payload.inputs.quantity) * item.prix_max,
                ),
              }
            : item,
        );
      } else {
        state.push({
          ...payload.item,
          quantity: Number(payload.inputs.quantity),
          total: Math.round(payload.inputs.quantity * payload.prix_max),
        });
      }
    },
    addToCartOnChange(state, {payload}, sound) {
      return state.map(item =>
        item.id === payload.item.id
          ? {
              ...item,
              quantity: Number(payload.quantity),
              total: Number(payload.quantity) * Number(item.prix_max),
            }
          : item,
      );
    },
    increment(state, {payload}) {
      return state.map(item =>
        item.id === payload
          ? {
              ...item,
              quantity: Number(item.quantity) + Number(1),
              total:
                Math.round(Number(item.quantity) + 1) * Number(item.prix_max),
            }
          : item,
      );
    },
    decrement(state, {payload}) {
      return state.map(item =>
        item.id === payload
          ? {
              ...item,
              quantity: item.quantity - 1,
              total: Number((item.quantity - 1) * item.prix_max),
            }
          : item,
      );
    },
    removeItem: (state, action) => {
      //   console.log(state);
      //   console.log(state);
      //   console.log(action);
      const itemId = action.payload;
      return state.filter(item => item.id !== itemId);
    },
    clear(state) {
      return [];
    },
  },
});

export const {
  addToCart,
  addToCartToEdit,
  addToCartEdit,
  addToCartOnChange,
  increment,
  decrement,
  removeItem,
  clear,
} = cartSlice.actions;
const CartReducer = cartSlice.reducer;

export default CartReducer;
