import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  alph = 'alph',
  length = 'length',
  reverse = 'reverse',
  reset = 'reset',
}

function sortGoods(goods: string[], sortField: SortType) {
  switch (sortField) {
    case SortType.length:
      return [...goods].sort((a, b) => a.length - b.length);
    case SortType.alph:
      return [...goods].sort((a, b) => a.localeCompare(b));
    case SortType.reset:
      return [...goodsFromServer];
    default:
      return [...goods];
  }
}

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);
  const [sortField, setSortField] = useState<SortType>(SortType.reset);
  const [isReversed, setIsReversed] = useState(false);

  const handleSort = (type: SortType) => {
    const sorted = sortGoods(goodsFromServer, type);

    setSortField(type);
    setIsReversed(false);
    setVisibleGoods(sorted);
  };

  const handleReverse = () => {
    setVisibleGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setVisibleGoods([...goodsFromServer]);
    setSortField(SortType.reset);
    setIsReversed(false);
  };

  const isOrderUnchanged = visibleGoods.every(
    (item, index) => item === goodsFromServer[index],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.alph,
          })}
          onClick={() => handleSort(SortType.alph)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => handleSort(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isOrderUnchanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
