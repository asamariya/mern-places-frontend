import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import './Input.scss';

const initialState = {
  value: '',
  isValid: false,
  isTouched: false
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
};

const Input = ({
  element,
  id,
  type,
  placeholder,
  rows,
  label,
  errorText,
  validators,
  onInput
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = e => {
    dispatch({
      type: 'CHANGE',
      val: e.target.value,
      validators: validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };
  const inputElement =
    element === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  return (
    <div
      className={`form-control ${!inputState.isValid &&
        inputState.isTouched &&
        'form-control--invalid'}`}
    >
      <label htmlFor={id}>{label}</label>
      {inputElement}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
