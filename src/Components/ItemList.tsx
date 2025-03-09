import React from 'react';

interface Props {
  listOfItems: string[];
}

const ItemList: React.FC<Props> = ({ listOfItems }) => {
  return (
    <ul>
      {listOfItems.map(good => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
