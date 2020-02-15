import React from 'react';

import UserItem from './UserItem';

import './UsersList.scss';

const UsersList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="text-center">
        <h2>No users found</h2>
      </div>
    );
  }

  return (
    <ul>
      {items.map(user => {
        const { id, name, image, places } = user;
        return (
          <UserItem
            key={id}
            id={id}
            image={image}
            name={name}
            placeCount={places}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
