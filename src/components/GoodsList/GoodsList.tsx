import React from 'react';
import './GoodsList.scss';

type Props = {
  list: string[];
};

export const GoodsList: React.FC<Props> = React.memo(
  ({ list }) => {
    return (
      <ul className="list">
        {list.map(item => (
          <li key={item} className="list__item">
            {item}
          </li>
        ))}
      </ul>
    );
  },
);
