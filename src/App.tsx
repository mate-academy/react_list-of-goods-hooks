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
  Length = 'length',
  Alphabet = 'alphabet',
  Default = '',
}

function getPreparedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  switch (sortType) {
    case SortType.Alphabet:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortType.Length:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    selectedSort,
    isReversed,
  );

  const onReset = () => {
    setSelectedSort(SortType.Default);
    setIsReversed(false);
  };

  const onAlphabet = () => {
    setSelectedSort(SortType.Alphabet);
  };

  const onLength = () => {
    setSelectedSort(SortType.Length);
  };

  const onReversed = () => {
    setIsReversed(prevIsReversed => !prevIsReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': selectedSort !== SortType.Alphabet,
          })}
          onClick={onAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': selectedSort !== SortType.Length,
          })}
          onClick={onLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={onReversed}
        >
          Reverse
        </button>

        {(selectedSort || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onReset}
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
