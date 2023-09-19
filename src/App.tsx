import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './types/SortType';
import { ReverseType } from './types/ReverseType';

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

function getSortedGoods(
  goods: string[],
  sortParameter: SortType,
  reverseParameter: ReverseType,
) {
  const sortedGoods = [...goods];

  if (sortParameter) {
    sortedGoods.sort((good1, good2) => {
      switch (sortParameter) {
        case SortType.Length:
          return good1.length - good2.length;

        case SortType.Alphabet:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (reverseParameter === ReverseType.Reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortParameter, setSortParameter] = useState(SortType.Default);
  const [reverseParameter, setReverseParameter] = (
    useState(ReverseType.Straight)
  );
  const visibleGoods = (
    getSortedGoods(goodsFromServer, sortParameter, reverseParameter)
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortParameter(SortType.Alphabet)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortParameter !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortParameter(SortType.Length)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortParameter !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            if (reverseParameter === ReverseType.Straight) {
              setReverseParameter(ReverseType.Reverse);
            } else {
              setReverseParameter(ReverseType.Straight);
            }
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverseParameter !== ReverseType.Reverse,
          })}
        >
          Reverse
        </button>

        {(sortParameter !== ''
          || reverseParameter !== ReverseType.Straight) && (
          <button
            onClick={() => {
              setReverseParameter(ReverseType.Straight);
              setSortParameter(SortType.Default);
            }}
            type="button"
            className="button is-danger is-light"
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
