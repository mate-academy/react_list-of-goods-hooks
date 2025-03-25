import React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortField {
  alphabetically = 'Sort alphabetically',
  length = 'Sort by length',
}

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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortField | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  const filter = () => {
    const goods = [...goodsFromServer];

    switch (sortType) {
      case SortField.alphabetically:
        goods.sort((a, b) => a.localeCompare(b));
        break;
      case SortField.length:
        goods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    if (isReversed) {
      goods.reverse();
    }

    return goods;
  };

  const sortedGoods = filter();

  return (
    <div className="section content">
      <div className="buttons">
        {Object.values(SortField).map(method => (
          <button
            onClick={() => {
              setSortType(method);
            }}
            key={method}
            className={classNames('button', {
              'is-info': method === SortField.alphabetically && sortType === method,
              'is-success': method === SortField.length && sortType === method,
              'is-light': sortType !== method,
            })}
          >
            {method}
          </button>
        ))}

        {
          <button
            type="button"
            className={classNames('button is-warning', {
              'is-light': !isReversed,
            })}
            onClick={() => setIsReversed(prev => !prev)} // Keeps the current sortType
          >
            Reverse
          </button>
        }

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
