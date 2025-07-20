import React from 'react';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

const CartView = () => {
  const { cart, clearCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center">
        <h2>El carrito está vacío</h2>
        <p>¡Agregá productos para empezar a comprar!</p>
        <Link to="/" className="btn btn-primary">Ir a la tienda</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Resumen de tu compra</h2>
        <button onClick={clearCart} className="btn btn-danger">Vaciar Carrito</button>
      </div>
      {cart.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      <div className="mt-4 text-end">
        <h4>Total: ${totalPrice.toFixed(2)}</h4>
        <button className="btn btn-success mt-2">Proceder al Pago</button>
      </div>
    </div>
  );
};

export default CartView;