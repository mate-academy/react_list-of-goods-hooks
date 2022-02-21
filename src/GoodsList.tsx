import React from 'react';

type Props = {
  listOfGoods :string[],
};

export const GoodsList:React.FC<Props> = React.memo(
  ({ listOfGoods }) => {
    return (
      <ul>
        {listOfGoods.map(good => (
          <li key={good}>
            {good}
          </li>
        ))}
      </ul>
    );
  },
);
