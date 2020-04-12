import React, { useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.scss';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHistory } from 'react-router-dom';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const initialState = {
  inputs: {
    title: {
      value: '',
      isValid: false,
    },
    description: {
      value: '',
      isValid: false,
    },
    address: {
      value: '',
      isValid: false,
    },
    image: {
      value: null,
      isValid: false,
    },
  },
  isValid: false,
};

const NewPlace = () => {
  const [formState, inputHandler] = useForm(initialState);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

  const auth = useContext(AuthContext);

  const placeSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(formState.inputs);
    try {
      const { title, description, address, image } = formState.inputs;
      const formData = new FormData();
      formData.append('title', title.value);
      formData.append('description', description.value);
      formData.append('address', address.value);
      formData.append('image', image.value);
      await sendRequest('http://localhost:5000/api/places', 'POST', formData, {
        Authorization: `Bearer ${auth.token}`,
      });
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onclear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          label="Description"
          element="textarea"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          label="Address"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image"
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
