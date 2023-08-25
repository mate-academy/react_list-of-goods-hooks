import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
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
  reverse = 'reverse',
}

interface FilterParams {
  sortMethod: string | '';
  reverseMethod: string;
}

function getSortedGoods(
  goods: string[],
  {
    sortMethod,
    reverseMethod,
  }: FilterParams,
) {
  const sortedGoods = [...goods];

  if (reverseMethod && sortMethod === SortType.alphabet) {
    return sortedGoods
      .sort((good1, good2) => good1.localeCompare(good2))
      .reverse();
  }

  if (reverseMethod && sortMethod === SortType.length) {
    return sortedGoods
      .sort((good1, good2) => good1.length - good2.length)
      .reverse();
  }

  if (reverseMethod) {
    return sortedGoods.reverse();
  }

  if (sortMethod) {
    sortedGoods.sort((good1, good2) => {
      switch (sortMethod) {
        case SortType.alphabet:
          return good1.localeCompare(good2);
        case SortType.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortMethod, setSortMethod] = useState('');
  const [reverseMethod, setreverseMethod] = useState('');
  const visibleGoods = getSortedGoods(
    goodsFromServer,
    {
      sortMethod,
      reverseMethod,
    },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortMethod !== SortType.alphabet },
          )}
          onClick={() => setSortMethod(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortMethod !== SortType.length },
          )}
          onClick={() => setSortMethod(SortType.length)}
        >
          Sort by length
        </button>

        {reverseMethod ? (
          <button
            type="button"
            className={cn(
              'button',
              'is-warning',
              { 'is-light': reverseMethod !== SortType.reverse },
            )}
            onClick={() => setreverseMethod('')}
          >
            Reverse
          </button>
        ) : (
          <button
            type="button"
            className={cn(
              'button',
              'is-warning',
              { 'is-light': reverseMethod !== SortType.reverse },
            )}
            onClick={() => setreverseMethod(SortType.reverse)}
          >
            Reverse
          </button>
        )}

        {(sortMethod || reverseMethod) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortMethod('');
              setreverseMethod('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      {visibleGoods.map(good => (
        <li data-cy="Good" key={good}>{good}</li>
      ))}
    </div>
  );
};
