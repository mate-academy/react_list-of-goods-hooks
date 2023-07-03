import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';

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

enum SortFields {
  DEFAULT = '',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

interface PrepareParams {
  sortBy: SortFields,
  isReversed : boolean,
}

function sortGoods(
  good1: string,
  good2: string,
  sortBy: SortFields,
) {
  switch (sortBy) {
    case (SortFields.ALPHABET):
      return good1.localeCompare(good2);

    case (SortFields.LENGTH):
      return good1.length - good2.length;

    default:
      return 0;
  }
}

function prepareGoods(
  goods: string[],
  { sortBy, isReversed }: PrepareParams,
) {
  const goodsSorted = [...goods]
    .sort((good1, good2) => sortGoods(good1, good2, sortBy));

  if (isReversed) {
    goodsSorted.reverse();
  }

  return goodsSorted;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortFields>(SortFields.DEFAULT);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const isShowResetButton = sortBy || isReversed;
  const visibleGoods = prepareGoods(goodsFromServer, { sortBy, isReversed });

  function handleResetClick() {
    setSortBy(SortFields.DEFAULT);
    setIsReversed(false);
  }

  const resetButton = (
    <button
      type="button"
      className="button is-danger is-light"
      onClick={() => handleResetClick()}
    >
      Reset
    </button>
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortFields.ALPHABET,
          })}
          onClick={() => setSortBy(SortFields.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SortFields.LENGTH,
          })}
          onClick={() => setSortBy(SortFields.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(currentSsReversed => !currentSsReversed)}
        >
          Reverse
        </button>

        {isShowResetButton && resetButton}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
