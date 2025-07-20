import React from 'react';
import { useCart } from '../../context/CartContext';
import { FaTrash } from 'react-icons/fa';

const CartItem = ({ item }) => {
  const { removeItem } = useCart();

  return (
    <div className="d-flex justify-content-between align-items-center border-bottom py-3">
      <div className="d-flex align-items-center">
        <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px' }} />
        <div>
          <h5>{item.name}</h5>
          <p className="mb-0 text-muted">${item.price}</p>
        </div>
      </div>
      <button onClick={() => removeItem(item.id)} className="btn btn-outline-danger btn-sm">
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;