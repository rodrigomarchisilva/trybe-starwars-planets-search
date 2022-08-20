import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useFilters } from '../context/Filters';
import Select from './Select';

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
    <InputGroup>
      <Select
        columnSelect={ {
          dataTestid: 'column-filter',
          value: selectValue || '',
          onChange: ({ target }) => setSelectValue(target.value),
          options: numericColumnOptions,
        } }
      />

      <Select
        columnSelect={ {
          dataTestid: 'comparison-filter',
          value: comparisonValue,
          onChange: ({ target }) => setComparisonValue(target.value),
          options: ['maior que', 'menor que', 'igual a'],
        } }
      />

      <Form.Control
        type="number"
        data-testid="value-filter"
        value={ inputValue }
        onChange={ ({ target }) => setInputValue(target.value) }
      />

      <Button
        type="button"
        data-testid="button-filter"
        onClick={ addFilter }
        disabled={ numericColumnOptions.length === 0 }
      >
        Filtrar
      </Button>
    </InputGroup>
  );
}
