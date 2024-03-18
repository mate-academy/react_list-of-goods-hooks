/* eslint-disable @typescript-eslint/indent */
import { useState } from 'react';
import cn from 'classnames';

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

enum SortField {
  Alphabet = 'alphabet',
  Length = 'length',
  Default = '',
}

const getPreparedGoods = (
  listOfGoods: string[],
  sortField: SortField,
  isReversed: boolean,
): string[] => {
  const preparedGoods = [...listOfGoods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SortField.Alphabet:
          return a.localeCompare(b);
        case SortField.Length:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.Default);
  const [isReversed, setIsReversed] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, sortField, isReversed);
  const isChanged = sortField || isReversed;

  const handleResetButton = () => {
    setSortField(SortField.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortField.Alphabet,
          })}
          onClick={() => {
            setSortField(SortField.Alphabet);
          }}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortField.Length,
          })}
          onClick={() => {
            setSortField(SortField.Length);
          }}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prevState => !prevState)}
        >
          Reverse
        </button>
        {isChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetButton}
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
