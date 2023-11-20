import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export const goodsFromServer: string[] = [
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
  SORT_FIELD_ALPHABET = 'alphabet',
  SORT_FIELD_LENGTH = 'length',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  let preparedGoods = [...goodsFromServer];

  if (sortField) {
    switch (sortField) {
      case SortType.SORT_FIELD_ALPHABET:
        preparedGoods = preparedGoods
          .sort((good1, good2) => (good1.localeCompare(good2)));
        break;

      case SortType.SORT_FIELD_LENGTH:
        preparedGoods = preparedGoods
          .sort((good1, good2) => (good1.length - good2.length));
        break;

      default:
        break;
    }

    if (isReversed) {
      preparedGoods.reverse();
    }
  }

  if (!sortField && isReversed) {
    preparedGoods.reverse();
  }

  const handleCliclReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.SORT_FIELD_ALPHABET)}
          className={cn('button is-info',
            { 'is-light': sortField !== SortType.SORT_FIELD_ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.SORT_FIELD_LENGTH)}
          className={cn('button is-success',
            { 'is-light': sortField !== SortType.SORT_FIELD_LENGTH })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleCliclReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
