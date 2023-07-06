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
  Alph = 'alph',
  Length = 'length',
}

function getPrepearedGoods(
  goods: string[],
  sortType: string,
  isReversed: boolean,
) {
  const prepearedGoods = [...goods];

  prepearedGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.Length:
        return good1.length - good2.length;

      case SortType.Alph:
        return good1.localeCompare(good2);

      default:
        return 0;
    }
  });

  if (isReversed) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortFeild, setSortFeild] = useState('');
  const [sortReverse, setSortReverse] = useState(false);
  const finalGoods = getPrepearedGoods(goodsFromServer, sortFeild, sortReverse);
  const resetSort = () => {
    setSortFeild('');
    setSortReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortFeild !== SortType.Alph },
          )}
          onClick={() => {
            setSortFeild(SortType.Alph);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortFeild !== SortType.Length },
          )}
          onClick={() => {
            setSortFeild(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !sortReverse },
          )}
          onClick={() => {
            setSortReverse(!sortReverse);
          }}
        >
          Reverse
        </button>

        {(sortFeild !== '' || sortReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {finalGoods.map(good => (
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
