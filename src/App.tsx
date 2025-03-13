import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
];

enum SortType {
  Default = '',
  Alpha = 'alpha',
  Length = 'len',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [reversed, setReversed] = useState(false);

  const handleSort = (type: SortType) => {
    if (sortType !== type) {
      setSortType(type);
    }
  };

  const handleReset = () => {
    setSortType(SortType.Default);
    setReversed(false);
  };

  const handleReverse = () => {
    setReversed(prev => !prev);
  };

  const goods = [...goodsFromServer];

  goods.sort((a, b) => {
    switch (sortType) {
      case SortType.Alpha:
        return a.localeCompare(b);
      case SortType.Length:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.Alpha,
          })}
          onClick={() => handleSort(SortType.Alpha)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => handleReverse()}
        >
          Reverse
        </button>

        {(sortType || reversed) && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={() => handleReset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
