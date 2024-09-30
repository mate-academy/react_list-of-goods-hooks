import React, { useState } from 'react';
import cn from 'classnames'
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
  alphabet = 'alphabet',
  length = 'length',
  default = '',
}

function prepareGoods(
  goods: string[],
  sortedField: string,
  isReversed: boolean,
) {
  const copyGoods = [...goods];

  if (sortedField !== SortType.default) {
    copyGoods.sort((elementA, elementB) => {
      switch (sortedField) {
        case SortType.alphabet:
          return elementA.localeCompare(elementB);

        case SortType.length:
          return elementA.length - elementB.length;

        case SortType.default:
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    copyGoods.reverse();
  }

  return copyGoods;
}

export const App: React.FC = () => {
  const [sortedField, setSortField] = useState(SortType.default);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = prepareGoods(goodsFromServer, sortedField, isReversed);

  function handleReset() {
    setSortField(SortType.default);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortedField !== SortType.alphabet,
          })}
          onClick={() => setSortField(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortedField !== SortType.length,
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(previousValue => !previousValue)}
        >
          Reverse
        </button>

        {(sortedField !== '' || isReversed) && (
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
