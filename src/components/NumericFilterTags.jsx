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

  const buttonGroupDisplay = numericColumnFilters.length > 0 ? 'd-block' : 'd-none';

  return (
    <ButtonGroup className={ `${buttonGroupDisplay} ps-1 pe-1` }>
      { numericColumnFilters.map(({ column, comparison, value }, index) => (
        <Button
          className="mb-2 ms-1 me-1 rounded-1 border border-secondary"
          size="sm"
          key={ index }
          variant="dark"
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
