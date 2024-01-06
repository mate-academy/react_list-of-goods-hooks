import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { Good } from './Good';

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
  None,
  Alphabet,
  Length,
}

interface ReorderingParams {
  sortType: SortType;
  isReversed: boolean;
}

function getFinalGoods(
  goods: string[],
  { sortType, isReversed }: ReorderingParams,
) {
  let finalGoods = [...goods];

  if (sortType) {
    finalGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    finalGoods = finalGoods.reverse();
  }

  return finalGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const goods = getFinalGoods(goodsFromServer, { sortType, isReversed });
  const isModified = isReversed || !!sortType;

  function reset() {
    setSortType(SortType.None);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabet,
          })}
          onClick={() => setSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <Good good={good} key={good} />
          ))}
        </ul>
      </ul>
    </div>
  );
};
