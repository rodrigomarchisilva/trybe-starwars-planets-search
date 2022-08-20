import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Radio({ propsObject }) {
  const { value, onChange, checked, dataTestid } = propsObject;

  Form.Check.defaultProps = {
    label: value,
    id: value,
    type: 'radio',
    value,
    name: 'sort-type',
    onChange,
    checked,
    size: 'sm',
  };

  return (
    <Form.Check data-testid={ dataTestid } />
  );
}

Radio.propTypes = {
  propsObject: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    dataTestid: PropTypes.string,
  }),
}.isRequired;
