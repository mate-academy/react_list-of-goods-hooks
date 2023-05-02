import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classnames from 'classnames';

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

interface ReorderOptions {
  sortType: SortType,
  isReversed: boolean,
}

function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((currentGood, nextGood) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return currentGood.localeCompare(nextGood);

      case SortType.LENGTH:
        return currentGood.length - nextGood.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  const handleSortByAlphabet = () => setSortType(SortType.ALPHABET);
  const handleSortByLength = () => setSortType(SortType.LENGTH);
  const handleReversed = () => setIsReversed(!isReversed);
  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReversed}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
