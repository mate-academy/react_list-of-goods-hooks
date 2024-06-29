import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  DEFAULT = '',
}

enum IsReversed {
  NO_REVERSED,
  REVERSED,
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [reverseField, setReverseField] = useState(IsReversed.NO_REVERSED);

  const visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SortType.ALPHABET:
        return good1.localeCompare(good2);
      case SortType.LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverseField) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.ALPHABET)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() =>
            setReverseField(
              !reverseField ? IsReversed.REVERSED : IsReversed.NO_REVERSED,
            )
          }
          className={cn('button', 'is-warning', {
            'is-light': reverseField !== IsReversed.REVERSED,
          })}
        >
          Reverse
        </button>

        {(reverseField || sortField) && (
          <button
            type="button"
            onClick={() => {
              setSortField(SortType.DEFAULT);
              setReverseField(IsReversed.NO_REVERSED);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      {}
      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
