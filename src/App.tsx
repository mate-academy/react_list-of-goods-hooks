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

interface Good {
  name: string;
  id: number;
}

enum SortType {
  Name = 'name',
  Length = 'length',
  None = 'no-sorting',
}

export const goodsObject: Good[] = goodsFromServer
  .map((good, index) => ({ name: good, id: index }));

function getSortedGoods(
  goods: Good[],
  sortType: SortType,
  toReverse: boolean,
): Good[] {
  const sortedGoods = [...goods];

  if (sortType === SortType.Name) {
    sortedGoods.sort((good1, good2) => good1.name.localeCompare(good2.name));
  }

  if (sortType === SortType.Length) {
    sortedGoods.sort((good1, good2) => good1.name.length - good2.name.length);
  }

  return toReverse ? sortedGoods.reverse() : sortedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getSortedGoods(goodsObject, sortType, isReversed);
  const isResetSeen = sortType !== SortType.None || isReversed;

  const handleReverseButton = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortType !== SortType.Name })}
          onClick={() => setSortType(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortType !== SortType.Length })}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
          onClick={handleReverseButton}
        >
          Reverse
        </button>

        {isResetSeen && (
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
        {visibleGoods.map((good) => {
          const {
            name,
            id,
          } = good;

          return (
            <li data-cy="Good" key={id}>{name}</li>
          );
        })}
      </ul>
    </div>
  );
};
