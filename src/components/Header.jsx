import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useFilters } from '../context/Filters';
import NumericFilter from './NumericFilter';
import NumericFilterTags from './NumericFilterTags';
import Sort from './Sort';

export default function Header() {
  const { filters, setFilters } = useFilters();

  const handleInputChange = ({ target }) => {
    setFilters({ ...filters, filterByName: target.value });
  };

  const colProps = {
    xs: 12,
    sm: 4,
    xl: 2,
    className: 'p-1',
  };

  return (
    <header>
      <h1 id="title">Star Wars</h1>
      <h3 id="subtitle">Planets Search</h3>
      <Form>
        <Row className="m-1">
          <Col { ...colProps }>
            <Form.Control
              type="text"
              placeholder="Filtrar por nome"
              data-testid="name-filter"
              value={ filters.filterByName }
              onChange={ handleInputChange }
              size="sm"
            />
          </Col>
          <Sort />
          <NumericFilter />
        </Row>
      </Form>
      <NumericFilterTags />
    </header>
  );
}
