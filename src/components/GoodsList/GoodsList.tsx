import React, { useState } from 'react';
import './GoodsList.scss';

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  const [filter, setFilter] = useState<string>('id');
  const [reverse, setReverse] = useState<boolean>(false);

  const preparedGoods = goods.map((good, index) => ({
    id: index,
    name: good,
  }));

  preparedGoods.sort((g1, g2) => {
    switch (filter) {
      case 'id':
        return (g1.id - g2.id);

      case 'az':
        return (g1.name.localeCompare(g2.name));

      case 'length':
        return (g1.name.length - g2.name.length);

      default:
        return 0;
    }
  });

  if (reverse) {
    preparedGoods.reverse();
  }

  return (
    <div className="Goods">
      <div className="Goods__buttons">
        <button
          type="button"
          className="button button-blue"
          onClick={() => {
            setFilter('az');
            setReverse(false);
          }}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className="button button-blue"
          onClick={() => {
            setFilter('length');
            setReverse(false);
          }}
        >
          Sort by length
        </button>
        <button
          type="button"
          className="button button-blue"
          onClick={() => {
            setReverse(true);
          }}
        >
          Revers
        </button>
        <button
          type="button"
          className="button button-orange"
          onClick={() => {
            setFilter('id');
            setReverse(false);
          }}
        >
          Reset
        </button>
      </div>

      <div className="Goods__header">
        <h1>Goods</h1>
        {`Goods quantity: ${preparedGoods.length}`}
      </div>

      <div className="Goods__list">
        <ul>
          {preparedGoods.map((good) => (
            <li key={good.name}>{good.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
