import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortBy {
  Alphabet = 'alphabet',
  Length = 'length',
  Default = '',
}

const goodsFromServer: string[] = [
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

function sortGoods(goods: string[], sortBy: SortBy): string[] {
  const sortedGoods = [...goods];

  switch (sortBy) {
    case SortBy.Alphabet:
      return sortedGoods.sort((a, b) => a.localeCompare(b));

    case SortBy.Length:
      return sortedGoods.sort((a, b) => a.length - b.length);

    default:
      return sortedGoods;
  }
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortBy>(SortBy.Default);
  const [isReversed, setIsReversed] = useState(false);
  const renderGoods = sortGoods(goodsFromServer, sortField);

  if (isReversed) {
    renderGoods.reverse();
  }

  const reset = () => {
    setSortField(SortBy.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== 'alphabet',
          })}
          onClick={() => setSortField(SortBy.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={() => setSortField(SortBy.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
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
        {renderGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
