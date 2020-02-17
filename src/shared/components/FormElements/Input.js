import React from 'react';

import './Input.scss';

const Input = ({ element, id, type, placeholder, rows, label }) => {
  const inputElement =
    element === 'input' ? (
      <input id={id} type={type} placeholder={placeholder} />
    ) : (
      <textarea id={id} rows={rows || 3} />
    );
  return (
    <div className={`form-control`}>
      <label htmlFor={id}>{label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
