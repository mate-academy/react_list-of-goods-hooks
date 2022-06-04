import React from 'react';

interface Props {
  list: string[];
}

export const GoodsList: React.FC<Props> = ({ list }) => {
  return (
    <ul>
      {
        list.map(good => {
          return (
            <li key={good}>
              {good}
            </li>
          );
        })
      }
    </ul>
  );
};
