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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((currentGood, nextGood) => (
        currentGood.localeCompare(nextGood)
      ));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((currentGood, nextGood) => (
        currentGood.length - nextGood.length
      ));
      break;

    case SortType.NONE:
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSort] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);
  const visibleGood = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );
  const shouldRenderResetButton = sortType !== SortType.NONE || isReversed;
  const resetButton = () => {
    setSort(SortType.NONE);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => {
            setSort(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => {
            setSort(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setReverse(prev => !prev)}
        >
          Reverse
        </button>

        {shouldRenderResetButton && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetButton}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGood.map(name => (
          <li key={name} data-cy="Good">{name}</li>
        ))}
      </ul>
    </div>
  );
};
