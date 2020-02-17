import React, { useReducer } from 'react';

import './Input.scss';

const initialState = {
  value: '',
  isValid: false
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: true
      };
    default:
      return state;
  }
};

const Input = ({ element, id, type, placeholder, rows, label, errorText }) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const changeHandler = e => {
    dispatch({ type: 'CHANGE', val: e.target.value });
  };
  const inputElement =
    element === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        value={inputState.value}
      />
    );
  return (
    <div
      className={`form-control ${!inputState.isValid &&
        'form-control--invalid'}`}
    >
      <label htmlFor={id}>{label}</label>
      {inputElement}
      {!inputState.isValid && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
