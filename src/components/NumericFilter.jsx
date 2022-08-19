import React, { useState } from 'react';
import { useFilters } from '../context/Filters';

const NumericFilter = () => {
  const { filters, setFilters } = useFilters();

  const { filterByNumericValues } = filters;

  const columnOptions = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  filterByNumericValues.forEach((filter) => {
    if (columnOptions.includes(filter.column)) {
      columnOptions.splice(columnOptions.indexOf(filter.column), 1);
    }
  });

  const columnOptionsDisplayed = columnOptions.map((option, index) => (
    <option key={ index } value={ option }>{ option }</option>
  ));

  const [componentValues, setComponentValues] = useState({
    columnValue: 'population',
    comparisonValue: 'bigger-than',
    inputValue: '0',
  });

  const {
    columnValue, comparisonValue, inputValue,
  } = componentValues;

  const createValidColumnOptions = () => {
    const usedColumnOptions = filterByNumericValues.map((filter) => filter.column);
    const validColumnOptions = columnOptions.filter(
      (option) => !(usedColumnOptions.includes(option)),
    );
    setComponentValues({
      ...componentValues,
      columnValue: validColumnOptions[0] || '',
    });
  };

  const checkColumnValue = () => {
    let output = columnValue;
    if (columnOptions.length !== 0 && columnValue === '') {
      [output] = columnOptions;
    }
    return output;
  };

  const addFilter = () => {
    const numericFiltersArray = filterByNumericValues;
    const newNumericFilter = {
      column: checkColumnValue(), comparison: comparisonValue, value: inputValue };
    numericFiltersArray.push(newNumericFilter);
    setFilters({ ...filters, filterByNumericValues: numericFiltersArray });
    createValidColumnOptions();
  };

  return (
    <section>
      <select
        data-testid="column-filter"
        value={ checkColumnValue() }
        onChange={ ({ target }) => setComponentValues(
          { ...componentValues, columnValue: target.value },
        ) }
      >
        { columnOptionsDisplayed }
      </select>

      <select
        data-testid="comparison-filter"
        value={ comparisonValue }
        onChange={ ({ target }) => setComponentValues(
          { ...componentValues, comparisonValue: target.value },
        ) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ inputValue }
        onChange={ ({ target }) => setComponentValues(
          { ...componentValues, inputValue: target.value },
        ) }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ addFilter }
        disabled={ columnOptions.length === 0 }
      >
        Filtrar
      </button>
    </section>
  );
};

export default NumericFilter;
