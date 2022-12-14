import React, { useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import { useFilters } from '../context/Filters';
import { usePlanets } from '../context/Planets';
import Select from './Select';
import Radio from './Radio';

export default function Sort() {
  const [selectValue, setSelectValue] = useState('name');
  const [radioValue, setRadioValue] = useState('ASC');

  const { planets } = usePlanets();
  const { filters, setFilters } = useFilters();

  let columnOptions = ['no_options_available'];

  if (planets.length > 0) {
    columnOptions = Object.keys(planets[0]);
  }

  const handleRadioChange = ({ target }) => {
    if (radioValue !== target.value) {
      setRadioValue(target.value);
    }
  };

  const sortPlanets = () => {
    setFilters({
      ...filters,
      order: { column: selectValue, sort: radioValue },
    });
  };

  const colProps = {
    select: {
      xs: 3,
      sm: 2,
      xl: 1,
      className: 'p-1',
    },
    asc: {
      xs: 3,
      sm: 2,
      xl: 1,
      className: 'd-flex justify-content-center align-items-center p-1',
    },
    desc: {
      xs: 3,
      sm: 2,
      xl: 1,
      className: 'd-flex justify-content-center align-items-center p-1',
    },
    button: {
      xs: 3,
      sm: 2,
      xl: 1,
      className: 'd-grid p-1',
    },
  };

  const selectProps = {
    dataTestid: 'column-sort',
    value: selectValue,
    onChange: ({ target }) => setSelectValue(target.value),
    options: columnOptions,
  };

  const ascProps = {
    value: 'ASC',
    onChange: handleRadioChange,
    checked: radioValue === 'ASC',
    dataTestid: 'column-sort-input-asc',
  };

  const descProps = {
    value: 'DESC',
    onChange: handleRadioChange,
    checked: radioValue === 'DESC',
    dataTestid: 'column-sort-input-desc',
  };

  return (
    <>
      <Col { ...colProps.select }>
        <Select propsObject={ selectProps } />
      </Col>

      <Col { ...colProps.asc }>
        <Radio propsObject={ ascProps } />
      </Col>

      <Col { ...colProps.desc }>
        <Radio propsObject={ descProps } />
      </Col>

      <Col { ...colProps.button }>
        <Button
          type="button"
          onClick={ sortPlanets }
          data-testid="column-sort-button"
          size="sm"
          variant="secondary"
          className="border border-light"
        >
          Ordenar
        </Button>
      </Col>
    </>
  );
}
