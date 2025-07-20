import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaTools } from 'react-icons/fa';
import styled from 'styled-components';
import logo from '../../assets/adedas.png';

const Navbar = styled.nav`
  background-color: #343a40 !important;
  padding: 0.5rem 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1030;
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8) !important;
  margin: 0 10px;
  &:hover {
    color: #fff !important;
  }
`;

const CartIcon = styled.span`
  position: relative;
  .cart-count {
    position: absolute;
    top: -10px;
    right: -15px;
    background-color: #dc3545;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.75rem;
  }
`;

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Adedas" height="60" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-4">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Inicio</NavLink>
            </li>
             {isAuthenticated && user.role === 'admin' && (
               <li className="nav-item">
                <NavLink className="nav-link" to="/admin"><FaTools /> Admin</NavLink>
               </li>
             )}
          </ul>
          <div className="d-flex align-items-center mt-3 mt-lg-0">
            <NavLink to="/cart">
              <CartIcon>
                <FaShoppingCart size={24} />
                {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
              </CartIcon>
            </NavLink>
            {isAuthenticated ? (
              <>
                <span className="navbar-text text-white mx-3">
                  <FaUser/>Hola {user.username}
                </span>
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
                  <FaSignOutAlt/>Salir
                </button>
              </>
            ) : (
              <NavLink to="/login" className="btn btn-outline-success btn-sm">
                Entrar
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;