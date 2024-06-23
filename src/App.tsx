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

export enum SortType {
  NONE = '',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [reverseField, setReverseField] = useState(false);

  const sortedGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SortType.ALPHABET:
        return good1.localeCompare(good2);
      case SortType.LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  const visibleGoods = reverseField ? [...sortedGoods].reverse() : sortedGoods;

  const reset = () => {
    setSortField(SortType.NONE);
    setReverseField(false);
  };

  const showResetButton = sortField !== SortType.NONE || reverseField;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.ALPHABET,
          })}
          onClick={() => setSortField(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverseField,
          })}
          onClick={() => {setReverseField(!reverseField)}}
        >
          Reverse
        </button>

        {showResetButton && (
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
