import React from 'react';
import PlaceList from '../components/PlaceList';

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
      long: -73.9878584
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
const UserPlaces = () => {
  return <PlaceList items={DUMMY_PLACES} />;
};

export default UserPlaces;
