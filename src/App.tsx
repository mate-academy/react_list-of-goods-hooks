import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

type FilterParams = {
  sortField: SortType | '';
  sortReverse: boolean;
};

enum SortType {
  alphabet = 'alphabet',
  length = 'length',
}

const sortGoods = (
  goods: string[],
  { sortField, sortReverse }: FilterParams,
) => {
  const renderGoods = [...goods];

  if (sortField) {
    renderGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabet:
          return good1.localeCompare(good2);
        case SortType.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (sortReverse) {
    renderGoods.reverse();
  }

  return renderGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [sortReverse, setSortReverse] = useState<boolean>(false);

  const sortedGoods = sortGoods(goodsFromServer, { sortField, sortReverse });

  const reset = () => {
    setSortField('');
    setSortReverse(false);
  };

  const handleSortAlphabet = () => {
    setSortField(SortType.alphabet);
  };

  const handleSortLength = () => {
    setSortField(SortType.length);
  };

  const handleSortReverse = () => {
    setSortReverse(!sortReverse);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.alphabet,
          })}
          onClick={handleSortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !sortReverse,
          })}
          onClick={handleSortReverse}
        >
          Reverse
        </button>

        {(sortField || sortReverse) && (
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
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
