import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductForm from '../components/products/ProductForm';
import { createProduct, updateProduct, deleteProduct } from '../services/productService';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ConfirmationModal from '../components/common/ConfirmationModal';

const AdminPage = () => {
  const { products, loading, error, refetchProducts } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleCreate = async (productData) => {
    await createProduct(productData);
    toast.success('Producto creado con éxito!');
    refetchProducts();
  };

  const handleUpdate = async (productData) => {
    await updateProduct(editingProduct.id, productData);
    toast.success('Producto actualizado con éxito!');
    setEditingProduct(null);
    refetchProducts();
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(productToDelete.id);
      toast.success(`Producto "${productToDelete.name}" eliminado.`);
      refetchProducts();
    } catch (err) {
        toast.error("Error al eliminar el producto.");
    } finally {
        setShowModal(false);
        setProductToDelete(null);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    window.scrollTo(0, 0);
  };

  return (
    <div className="row">
      <div className="col-lg-4">
        <ProductForm 
          onSubmit={editingProduct ? handleUpdate : handleCreate}
          initialData={editingProduct}
        />
        {editingProduct && (
            <button className="btn btn-secondary mt-2" onClick={() => setEditingProduct(null)}>
                Cancelar Edición
            </button>
        )}
      </div>
      <div className="col-lg-8">
        <h2>Gestionar Productos</h2>
        {loading && <p>Cargando...</p>}
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td><img src={product.image} alt={product.name} width="50" /></td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    <button onClick={() => handleEditClick(product)} className="btn btn-sm btn-warning me-2" aria-label={`Editar ${product.name}`}>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteClick(product)} className="btn btn-sm btn-danger" aria-label={`Eliminar ${product.name}`}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
       <ConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        title="Confirmar Eliminación"
      >
        <p>¿Estás seguro de que querés eliminar el producto <strong>{productToDelete?.name}</strong>? Esta acción no se puede deshacer.</p>
      </ConfirmationModal>
    </div>
  );
};

export default AdminPage;