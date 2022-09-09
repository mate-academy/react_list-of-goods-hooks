import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
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

enum SortType {
  LENGTH = 'length',
  NAME = 'name',
  NONE = 'none',
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  let visibleGoods = [...goods];

  switch (sortType) {
    case 'name':
      visibleGoods = visibleGoods.sort(
        (f1, f2) => f1.localeCompare(f2),
      );
      break;

    case 'length':
      visibleGoods = visibleGoods.sort(
        (f1, f2) => f1.length - f2.length,
      );
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const ifReset = sortType !== 'none' || isReversed;

  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={() => {
            setSortType(SortType.NAME);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={() => {
            setSortType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={() => {
            setIsReversed(true);
          }}
        >
          Reverse
        </button>

        {ifReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortType(SortType.NONE);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul className="Goods">
        {reorderedGoods.map(good => (
          <li
            key={good}
            className="Goods__item"
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
