import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ProductForm = ({ onSubmit, initialData = null }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setProduct(initialData);
    } else {
      setProduct({ name: '', price: '', description: '', image: '', category: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!product.name) tempErrors.name = "El nombre es obligatorio.";
    if (product.price <= 0) tempErrors.price = "El precio debe ser mayor a 0.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(product)
        .then(() => {
            setProduct({ name: '', price: '', description: '', image: '', category: '' }); // Reset form
        })
        .catch(err => {
            toast.error("Ocurrió un error al guardar el producto.")
        })
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <h4 className="mb-3">{initialData ? 'Editar' : 'Agregar'} Producto</h4>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nombre</label>
        <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="name" name="name" value={product.name} onChange={handleChange} />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Precio</label>
        <input type="number" className={`form-control ${errors.price ? 'is-invalid' : ''}`} id="price" name="price" value={product.price} onChange={handleChange} />
        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Descripción</label>
        <textarea className={`form-control ${errors.description ? 'is-invalid' : ''}`} id="description" name="description" value={product.description} onChange={handleChange}></textarea>
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
      </div>
       <div className="mb-3">
        <label htmlFor="image" className="form-label">URL de Imagen</label>
        <input type="text" className="form-control" id="image" name="image" value={product.image} onChange={handleChange} />
      </div>
       <div className="mb-3">
        <label htmlFor="category" className="form-label">Categoría</label>
        <input type="text" className="form-control" id="category" name="category" value={product.category} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">{initialData ? 'Actualizar' : 'Agregar'}</button>
    </form>
  );
};

export default ProductForm;