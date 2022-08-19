import React from 'react';
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
    <section>
      { numericColumnFilters.map(({ column, comparison, value }, index) => (
        <div key={ index } data-testid="filter">
          <p>{ `${column} é ${comparison} ${value}` }</p>
          <button type="button" onClick={ () => removeFilter(column) }>X</button>
        </div>
      ))}
    </section>
  );
}
