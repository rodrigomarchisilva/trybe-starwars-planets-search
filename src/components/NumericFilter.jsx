import React, { useState, useEffect } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
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

  const colProps = {
    column: {
      xs: 3,
      sm: 4,
      xl: 2,
      className: 'p-1',
    },
    comparison: {
      xs: 3,
      sm: 4,
      xl: 2,
      className: 'p-1',
    },
    input: {
      xs: 3,
      sm: 2,
      xl: 1,
      className: 'p-1',
    },
    button: {
      xs: 3,
      sm: 2,
      xl: 1,
      className: 'd-grid p-1',
    },
  };

  return (
    <>
      <Col { ...colProps.column }>
        <Select
          propsObject={ {
            dataTestid: 'column-filter',
            value: selectValue || '',
            onChange: ({ target }) => setSelectValue(target.value),
            options: numericColumnOptions,
          } }
        />
      </Col>

      <Col { ...colProps.comparison }>
        <Select
          propsObject={ {
            dataTestid: 'comparison-filter',
            value: comparisonValue,
            onChange: ({ target }) => setComparisonValue(target.value),
            options: ['maior que', 'menor que', 'igual a'],
          } }
        />
      </Col>

      <Col { ...colProps.input }>
        <Form.Control
          type="number"
          data-testid="value-filter"
          value={ inputValue }
          onChange={ ({ target }) => setInputValue(target.value) }
          size="sm"
        />
      </Col>

      <Col { ...colProps.button }>
        <Button
          type="button"
          data-testid="button-filter"
          onClick={ addFilter }
          disabled={ numericColumnOptions.length === 0 }
          size="sm"
          variant="secondary"
          className="border-light"
        >
          Filtrar
        </Button>
      </Col>
    </>
  );
}
