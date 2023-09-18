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
  ALPHABET,
  LENGTH,
  NON,
}

function sortGoods(goods: string[], query: SortType) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (query) {
      case SortType.LENGTH:
        return good1.length - good2.length;

      case SortType.ALPHABET:
        return good1.localeCompare(good2);

      case SortType.NON:
      default:
        return 0;
    }
  });

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NON);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = sortGoods(goodsFromServer, sortField);

  if (isReversed) {
    visibleGoods.reverse();
  }

  const resetButton = sortField !== SortType.NON || isReversed;

  function handleResetClick() {
    setSortField(SortType.NON);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortField !== SortType.ALPHABET })}
          onClick={() => setSortField(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortField !== SortType.LENGTH })}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {resetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleResetClick()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(f => <li data-cy="Good">{f}</li>)}
        </ul>
      </ul>
    </div>
  );
};
