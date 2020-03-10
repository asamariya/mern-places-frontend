import React, { useState, useContext } from 'react';

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
import { AuthContext } from '../../shared/context/auth-context';

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
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(initialState);

  const signInHandler = async e => {
    e.preventDefault();

    if (isLoginMode) {
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });

        const responseData = await response.json();
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    }
    auth.login();
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
      <h2>{isLoginMode ? 'Sign In' : 'Register'}</h2>
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
