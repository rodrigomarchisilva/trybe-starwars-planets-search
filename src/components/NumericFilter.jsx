import React, { useState, useEffect } from 'react';
import { useFilters } from '../context/Filters';

export default function NumericFilter() {
  const { filters, setFilters } = useFilters();
  const { numericColumnFilters, numericColumnOptions } = filters;

  const [selectValue, setSelectValue] = useState('diameter');
  const [comparisonValue, setComparisonValue] = useState('maior que');
  const [inputValue, setInputValue] = useState('0');

  useEffect(() => {
    setSelectValue(numericColumnOptions[0]);
  }, [numericColumnOptions]);

  const addFilter = () => {
    const newNumericColumnOptions = [...numericColumnOptions].filter(
      (numericColumnOption) => numericColumnOption !== selectValue,
    );
    const newNumericColumnFilter = {
      column: selectValue,
      comparison: comparisonValue,
      value: inputValue,
    };
    setFilters({
      ...filters,
      numericColumnFilters: [...numericColumnFilters, newNumericColumnFilter],
      numericColumnOptions: newNumericColumnOptions,
    });
  };

  return (
    <section>
      <select
        data-testid="column-filter"
        value={ selectValue }
        onChange={ ({ target }) => setSelectValue(target.value) }
      >
        { numericColumnOptions.map((option, index) => (
          <option key={ index } value={ option }>{ option }</option>
        )) }
      </select>

      <select
        data-testid="comparison-filter"
        value={ comparisonValue }
        onChange={ ({ target }) => setComparisonValue(target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ inputValue }
        onChange={ ({ target }) => setInputValue(target.value) }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ addFilter }
        disabled={ numericColumnOptions.length === 0 }
      >
        Filtrar
      </button>
    </section>
  );
}
