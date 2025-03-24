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
  Alphabet = 'alph',
  Length = 'len',
  None = ''
}

function prepareGoods(goods: string[], sortField: SortType): string[] {
  const preparedGoods = [...goods];

  if (sortField !== SortType.None) {
    preparedGoods.sort((good1, good2) => {
      if (sortField === SortType.Alphabet) {
        return good1.localeCompare(good2);
      }

      if (sortField === SortType.Length) {
        return good1.length - good2.length;
      }

      return 0;
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const copyOfOriginGoods = [...goodsFromServer];
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortField, setSortField] = useState<SortType>(SortType.None);

  const visibleGoods = prepareGoods(copyOfOriginGoods, sortField);

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabet)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>
        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField !== SortType.None || isReversed) && (
          <button
            onClick={() => {
              setSortField(SortType.None);
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(goodName => (
          <li data-cy="Good" key={goodName}>
            {goodName}
          </li>
        ))}
      </ul>
    </div>
  );
};
