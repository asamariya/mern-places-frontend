import React, { useState } from 'react';

import '../../places/pages/PlaceForm.scss';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Button from '../../shared/components/FormElements/Button';

import './Auth.scss';
import Card from '../../shared/components/UIElements/Card';

const initialState = {
  inputs: {
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  },
  isValid: false
};

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(initialState);

  const signInHandler = e => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  const switchToRegisterHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };
  return (
    <Card className="authentication">
      <h2>Sign In</h2>
      <hr />
      <form onSubmit={signInHandler}>
        {!isLoginMode && (
          <Input
            id="name"
            type="text"
            label="Full Name"
            element="input"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your full name."
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          type="email"
          label="Email"
          element="input"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email."
          onInput={inputHandler}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          element="input"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password that is minimum 6 characters long."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'Sign In' : 'Register'}
        </Button>
      </form>
      <Button inverse onClick={switchToRegisterHandler}>
        Switch to {isLoginMode ? 'Register' : 'Sign In'}
      </Button>
    </Card>
  );
};

export default Auth;
