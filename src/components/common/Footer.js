import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  border-top: 1px solid #e7e7e7;
  text-align: center;
  padding: 7px;
  margin-top: auto;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <p className="mb-0 text-muted">Adedas® 2025 - Camila Aldana Colman</p>
      </div>
    </FooterContainer>
  );
};

export default Footer;