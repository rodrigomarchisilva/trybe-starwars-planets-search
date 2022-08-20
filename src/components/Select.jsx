import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Select({ propsObject }) {
  const { dataTestid, value, onChange, options } = propsObject;

  Form.Select.defaultProps = {
    value,
    onChange,
    size: 'sm',
  };

  return (
    <Form.Select data-testid={ dataTestid }>
      {options.map((option, index) => (
        <option key={ index } value={ option }>
          { option }
        </option>
      ))}
    </Form.Select>
  );
}

Select.propTypes = {
  columnSelect: PropTypes.shape({
    dataTestid: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.string),
  }),
}.isRequired;
