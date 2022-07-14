import React, { useState } from 'react';
import './App.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

type GoodsType = 'sortByAlph' | 'sortByLength' | 'reverse' | 'start' | 'reset';

interface Button {
  value: GoodsType;
  label: string
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [showList, setShowList] = useState(false);

  const isChange = (value: GoodsType) => {
    switch (value) {
      case 'sortByAlph':
        setGoods([...goods].sort());
        break;

      case 'sortByLength':
        setGoods([...goods]
          .sort((good1, good2) => good1.length - good2.length));
        break;

      case 'reverse':
        setGoods([...goods].reverse());
        break;

      case 'start':
        setShowList(!showList);
        break;

      case 'reset':
        setGoods(goodsFromServer);
        break;

      default:
    }
  };

  const BUTTONS: Button[] = [
    {
      value: 'start',
      label: 'Start',
    },
    {
      value: 'sortByAlph',
      label: 'Sort alphabetically',
    },
    {
      value: 'sortByLength',
      label: 'Sort by length',
    },
    {
      value: 'reverse',
      label: 'Reverse',
    },
    {
      value: 'reset',
      label: 'Reset',
    },
  ];

  return (
    <div className="App">
      {BUTTONS.map(({ value, label }) => (
        (!showList || value !== 'start') && (
          <button
            type="button"
            key={label}
            className="button"
            onClick={() => isChange(value)}
          >
            {label}
          </button>
        )
      ))}

      <ul className="Goods">
        {showList
        && (
          goods.map(good => (
            <li className="Goods__item" key={good}>
              {good}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
