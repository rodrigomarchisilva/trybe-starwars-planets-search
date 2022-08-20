import React from 'react';
import { Form, Row } from 'react-bootstrap';
import { useFilters } from '../context/Filters';
import NumericFilter from './NumericFilter';
import NumericFilterTags from './NumericFilterTags';
import Sort from './Sort';

export default function Header() {
  const { filters, setFilters } = useFilters();

  const handleInputChange = ({ target }) => {
    setFilters({ ...filters, filterByName: target.value });
  };

  return (
    <header>
      <h1 id="title">Star Wars</h1>
      <h3 id="subtitle">Planets Search</h3>
      <Form>
        <Row className="ms-2 me-2">
          <Form.Control
            type="text"
            placeholder="Filtrar por nome"
            data-testid="name-filter"
            value={ filters.filterByName }
            onChange={ handleInputChange }
            size="sm"
          />
        </Row>
        <NumericFilter />
        <Sort />
      </Form>
      <NumericFilterTags />
    </header>
  );
}
