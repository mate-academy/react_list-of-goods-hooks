import React, { useState } from 'react';
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

enum SortType {
  Default = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

function sortGoodsBy(goods: string[], sortingType: SortType): string[] {
  const sameGoods = [...goods];

  switch (sortingType) {
    case SortType.Alphabet:
      return sameGoods.sort((good1, good2) => {
        return good1.localeCompare(good2);
      });

    case SortType.Length:
      return sameGoods.sort((good1, good2) => {
        return good1.length - good2.length;
      });

    default:
      return goods;
  }
}

export const App: React.FC = () => {
  const [currentSorting, setCurrentSorting] = useState<SortType>(
    SortType.Default,
  );
  const [isReversed, setIsReversed] = useState(false);
  let goodsList = sortGoodsBy(goodsFromServer, currentSorting);

  if (isReversed) {
    goodsList = [...goodsList].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': currentSorting !== SortType.Alphabet,
          })}
          onClick={() => {
            setCurrentSorting(SortType.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': currentSorting !== SortType.Length,
          })}
          onClick={() => {
            setCurrentSorting(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(currentSorting || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setCurrentSorting(SortType.Default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
