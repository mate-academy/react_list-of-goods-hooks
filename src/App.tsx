import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
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
  sortByLength = 'sort by length',
  sortByAlphabet = 'sort by alphabet',
  default = '',
}

function sortGoods(sortField: SortType, isReversed: boolean) {
  const goods = [...goodsFromServer];

  if (sortField) {
    goods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.sortByLength:
          return good1.length - good2.length;

        case SortType.sortByAlphabet:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  return isReversed ? goods.reverse() : goods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.default);
  const [isReversed, setIsReversed] = useState(false);

  const goods = sortGoods(sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SortType.sortByAlphabet },
          )}
          onClick={() => setSortField(SortType.sortByAlphabet)}

        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SortType.sortByLength },
          )}
          onClick={() => setSortField(SortType.sortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setIsReversed(false);
                setSortField(SortType.default);
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {goods.map(good => (
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
