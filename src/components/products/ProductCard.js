import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FaCartPlus } from 'react-icons/fa';
import styled from 'styled-components';

const Card = styled.div`
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  }
`;

const CardImg = styled.img`
  height: 200px;
  object-fit: cover;
`;

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  return (
    <div className="col mb-4">
        <Card className="card h-100">
            <Link to={`/product/${product.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
              <CardImg src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">{product.category}</p>
                <p className="card-text">${product.price}</p>
              </div>
            </Link>
          <div className="card-footer bg-transparent border-top-0">
            <button onClick={() => addItem(product)} className="btn btn-primary w-100">
              <FaCartPlus /> Agregar al Carrito
            </button>
          </div>
        </Card>
    </div>
  );
};

export default ProductCard;