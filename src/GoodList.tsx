import React from 'react';

type Props = {
  goods: string[]
};

export const GoodList: React.FC<Props> = ({ goods }) => {
  return (
    <div>
      {
        goods.map(good => (
          <ul className="list__goods">
            <li
              className="list__goods__item"
              key={good}
            >
              {good}
            </li>
          </ul>
        ))
      }
    </div>
  );
};
