import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import LoginPage from '../pages/LoginPage';
import AdminPage from '../pages/AdminPage';
import ProtectedRoute from './ProtectedRoute';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #9db2d3ff;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 150px;
  background-color: #9db2d3ff;
`;


const AppRouter = () => {
  return (
    <AppContainer>
      <Header />
      <MainContent className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/cart"
            element={<ProtectedRoute><CartPage /></ProtectedRoute>}
          />
          <Route
            path="/admin"
            element={<ProtectedRoute><AdminPage /></ProtectedRoute>}
          />
        </Routes>
      </MainContent>
      <Footer />
    </AppContainer>
  );
};

export default AppRouter;