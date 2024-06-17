import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

type FilterQuery = {
  sortType: SortType | '';
  isReversed: boolean;
};

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
  Default = '',
}

function getPreperedArray(
  goods: string[],
  { sortType, isReversed }: FilterQuery,
) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.Alphabet:
        return good1.localeCompare(good2);
      case SortType.Length:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.Default);
  };

  const visibleGoods = getPreperedArray(goodsFromServer, {
    sortType,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.Alphabet)}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.Length)}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(isReversed || sortType) && (
          <button
            onClick={() => reset()}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good, index) => {
          return (
            <li key={`${good}${index + 1}`} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
