import React from 'react';

import '../../places/pages/PlaceForm.scss';
import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH
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
  const [formState, inputHandler] = useForm(initialState);

  const signInHandler = e => {
    e.preventDefault();
    console.log(formState.inputs);
  };
  return (
    <Card className="authentication">
      <h2>Sign In</h2>
      <hr />
      <form onSubmit={signInHandler}>
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
          Sign In
        </Button>
      </form>
    </Card>
  );
};

export default Auth;
