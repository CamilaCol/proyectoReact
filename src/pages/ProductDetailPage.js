import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';
import { FaCartPlus } from 'react-icons/fa';
import styled from 'styled-components';

const ProductImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError('No se encontró el producto.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="d-flex justify-content-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!product) return null;

  return (
    <div>
        <div className="row">
            <div className="col-md-6">
                <ProductImage src={product.image} alt={product.name} />
            </div>
            <div className="col-md-6">
                <h1>{product.name}</h1>
                <p className="lead text-muted">{product.category}</p>
                <h3 className="my-3">${product.price}</h3>
                <p>{product.description}</p>
                <button onClick={() => addItem(product)} className="btn btn-primary btn-lg mt-3">
                    <FaCartPlus /> Agregar al Carrito
                </button>
            </div>
        </div>
    </div>
  );
};

export default ProductDetailPage;