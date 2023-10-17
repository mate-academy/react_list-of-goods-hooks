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

  if (sortType) {
    sortedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.Name:
          return good1.name.localeCompare(good2.name);

        case SortType.Length:
          return good1.name.length - good2.name.length;

        case SortType.None:
        default:
          return 0;
      }
    });
  }

  return toReverse ? sortedGoods.reverse() : sortedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  let resetButton = null;

  const visibleGoods = getSortedGoods(goodsObject, sortType, isReversed);

  const handleReverseButton = () => {
    setIsReversed(!isReversed);
  };

  if (sortType !== SortType.None || isReversed) {
    resetButton = (
      <button
        type="button"
        className="button is-danger is-light"
        onClick={() => {
          setSortType(SortType.None);
          setIsReversed(false);
        }}
      >
        Reset
      </button>
    );
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.Name },
          )}
          onClick={() => setSortType(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.Length },
          )}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={handleReverseButton}
        >
          Reverse
        </button>

        {resetButton}
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
