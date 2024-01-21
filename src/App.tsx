import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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
  LENGTH = 'length',
  ALPHABET = 'alphabet',
  DEFAULT = '',
}

interface SortParams {
  sortField: SortType;
  isReversed: boolean;
}

function getPreparedGoods(goods: string[],
  { sortField, isReversed }: SortParams): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortType.ALPHABET:
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case SortType.LENGTH:
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        return preparedGoods;
    }
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortField, setSortField] = useState(SortType.DEFAULT);

  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, isReversed });

  const handleReverseClick = () => {
    setReversed(prev => !prev);
  };

  const handleResetClick = () => {
    setSortField(SortType.DEFAULT);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.ALPHABET,
          })}
          onClick={() => {
            setSortField(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
          onClick={() => {
            setSortField(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverseClick}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={handleResetClick}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
