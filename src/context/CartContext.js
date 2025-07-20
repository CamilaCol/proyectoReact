import React, { createContext, useContext, useReducer } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        toast.info(`${action.payload.name} ya está en el carrito.`);
        return state;
      }
      toast.success(`${action.payload.name} agregado al carrito!`);
      return [...state, { ...action.payload, quantity: 1 }];
    case 'REMOVE_ITEM':
      toast.error(`Producto eliminado del carrito.`);
      return state.filter(item => item.id !== action.payload);
    case 'CLEAR_CART':
      toast.warn('El carrito se ha vaciado.');
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const value = {
    cart,
    addItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};