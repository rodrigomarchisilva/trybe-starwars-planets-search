import React from 'react';
import { Badge, Button, ButtonGroup } from 'react-bootstrap';
import { useFilters } from '../context/Filters';

export default function NumericFilterTags() {
  const { filters, setFilters } = useFilters();
  const { numericColumnFilters, numericColumnOptions } = filters;

  const removeFilter = (column) => {
    const newNumericColumnFilters = [...numericColumnFilters].filter(
      (numericColumnFilter) => numericColumnFilter.column !== column,
    );
    setFilters({
      ...filters,
      numericColumnFilters: newNumericColumnFilters,
      numericColumnOptions: [...numericColumnOptions, column].sort(),
    });
  };

  return (
    <ButtonGroup
      className={ numericColumnFilters.length > 0 ? 'd-block' : 'd-none' }
      gap={ 3 }
    >
      { numericColumnFilters.map(({ column, comparison, value }, index) => (
        <Button
          size="sm"
          key={ index }
          variant="outline-dark"
          data-testid="filter"
        >
          <Badge
            className="me-2"
            bg="danger"
            role="button"
            onClick={ () => removeFilter(column) }
          >
            X
          </Badge>
          { `${column} é ${comparison} ${value}` }
        </Button>
      ))}
    </ButtonGroup>
  );
}
