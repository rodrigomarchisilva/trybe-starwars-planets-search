import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    filterByName: '',
    numericColumnFilters: [],
    numericColumnOptions: [
      'diameter',
      'orbital_period',
      'population',
      'rotation_period',
      'surface_water',
    ],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });

  return (
    <FiltersContext.Provider
      value={ { filters, setFilters } }
    >
      { children }
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) { throw new Error('useFilters must be used within a FiltersProvider'); }
  return context;
};

FiltersProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
