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
  alphabet = 'alphabet',
  length = 'length',
  none = '',
}

interface SomeParams{
  sortText: SortType;
  isReverse: boolean;
}

function getReadyGoods(goods: string[], { sortText, isReverse }: SomeParams) {
  const readyGoods = [...goods];

  if (sortText) {
    readyGoods.sort((good1, good2) => {
      switch (sortText) {
        case SortType.alphabet:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    readyGoods.reverse();
  }

  return readyGoods;
}

export const App: React.FC = () => {
  const [sortText, setSortText] = useState<SortType>(SortType.none);
  const [isReverse, setIsReverse] = useState(false);
  const sortedGoods = getReadyGoods(goodsFromServer, { sortText, isReverse });

  function reverseFunc() {
    if (isReverse) {
      setIsReverse(false);
    } else {
      setIsReverse(true);
    }
  }

  function resetFunc() {
    setSortText(SortType.none);
    setIsReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortText(SortType.alphabet)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortText !== SortType.alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortText(SortType.length)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortText !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverseFunc}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isReverse !== true,
          })}
        >
          Reverse
        </button>

        {(sortText || isReverse) && (
          <button
            onClick={resetFunc}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
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
