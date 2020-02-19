import React from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the tallest buildings in the world!',
    imageUrl:
      'https://images.unsplash.com/photo-1502104034360-73176bb1e92e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the tallest buildings in the world!',
    imageUrl:
      'https://images.unsplash.com/photo-1502104034360-73176bb1e92e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      long: -73.9878584
    },
    creator: 'u2'
  }
];

const UpdatePlace = () => {
  const { placeId } = useParams();

  const placeToUpdate = DUMMY_PLACES.find(place => place.id == placeId);

  if (!placeToUpdate) {
    return (
      <div className="center">
        <h2>Could not find place 😟</h2>
      </div>
    );
  }

  return (
    <div className="center">
      <form>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={() => {}}
          value={placeToUpdate.title}
          valid={true}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={() => {}}
          value={placeToUpdate.description}
          valid={true}
        />
        <Button type="submit" disabled={true}>
          Update Place
        </Button>
      </form>
    </div>
  );
};

export default UpdatePlace;
