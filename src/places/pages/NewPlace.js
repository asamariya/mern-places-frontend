import React, { useCallback } from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';
import './NewPlace.scss';
const NewPlace = () => {
  const titleInputHandler = useCallback((id, value, isValid) => {}, []);
  return (
    <form className="place-form">
      <Input
        type="text"
        label="Title"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={titleInputHandler}
      />
    </form>
  );
};

export default NewPlace;
