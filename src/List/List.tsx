import React from 'react';

type Props = {
  items: string[];
};

export const List: React.FC<Props> = ({ items }) => {
  return (
    <ul>
      {items.map((item: string, index: number) => (
        <li key={index} data-cy="Good">
          {item}
        </li>
      ))}
    </ul>
  );
};
