import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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
  length = 'length',
  alphabet = 'alphabet',
  default = 0,
}

function getSortedGoods(
  goods: string[],
  sortParameter: SortType,
  reverseParameter: boolean,
): string[] {
  const copyGoods = [...goods];

  if (reverseParameter === true) {
    copyGoods.reverse();
  }

  if (sortParameter) {
    copyGoods.sort((good1, good2) => {
      switch (sortParameter) {
        case SortType.length:
          if (reverseParameter) {
            return good2.length - good1.length;
          }

          return good1.length - good2.length;

        case SortType.alphabet:
          if (reverseParameter) {
            return good2.localeCompare(good1);
          }

          return good1.localeCompare(good2);

        default:
          return SortType.default;
      }
    });
  }

  return copyGoods;
}

export const App: React.FC = () => {
  const [reverseParameter, setReverseParameter] = useState(false);
  const [sortParameter, setSortParameter] = useState(SortType.default);

  const visibleGoods
    = getSortedGoods(goodsFromServer, sortParameter, reverseParameter);

  const reset = () => {
    setSortParameter(SortType.default);
    setReverseParameter(false);
  };

  const reverse = () => {
    if (reverseParameter) {
      setReverseParameter(false);
    }

    if (!reverseParameter) {
      setReverseParameter(true);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortParameter(SortType.alphabet)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortParameter !== SortType.alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortParameter(SortType.length)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortParameter !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={cn('button is-warning', {
            'is-light': reverseParameter === false,
          })}
        >
          Reverse
        </button>
        {(sortParameter || reverseParameter) && (
          <>
            <button
              onClick={reset}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          </>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
