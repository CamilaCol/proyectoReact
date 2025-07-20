import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  padding-left: 2.5rem;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
`;

const SearchBar = ({ value, onChange }) => {
  return (
    <SearchContainer>
      <SearchIcon />
      <SearchInput 
        type="text" 
        className="form-control" 
        placeholder="Buscar productos por nombre o categoría..." 
        value={value}
        onChange={onChange}
        aria-label="Barra de búsqueda de productos"
      />
    </SearchContainer>
  );
};

export default SearchBar;