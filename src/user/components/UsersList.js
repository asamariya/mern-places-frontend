import React from 'react';

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';

import './UsersList.scss';

const UsersList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="text-center">
        <Card>
          <h2>No users found</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
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
