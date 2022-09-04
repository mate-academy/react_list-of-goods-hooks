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

function getReorderedGoods(
  goods: string[],
  sortType: string,
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

  if (isReversed === true) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState('none');

  const newGoodsFromServer = getReorderedGoods(
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
            setSortType('name');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={() => {
            setSortType('length');
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

        {(sortType !== 'none' || isReversed === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortType('none');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul className="Goods">
        {newGoodsFromServer.map(good => (
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
