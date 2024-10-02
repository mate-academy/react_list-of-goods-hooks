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
  DEFAULT,
  ALPHABETICALLY,
  LENGTH,
}

interface SortingConditionals {
  sortingType: SortType;
  isReversed: boolean;
}

const sortingGoodsFunction = (
  goodsArray: string[],
  { sortingType, isReversed }: SortingConditionals,
) => {
  let goodsArrayCopy = [...goodsArray];

  switch (sortingType) {
    case SortType.ALPHABETICALLY:
      goodsArrayCopy = [...goodsArrayCopy].sort((good1, good2) =>
        good1.localeCompare(good2),
      );
      break;

    case SortType.LENGTH:
      goodsArrayCopy = [...goodsArrayCopy].sort(
        (good1, good2) => good1.length - good2.length,
      );
      break;

    default:
      break;
  }

  if (isReversed === true) {
    return goodsArrayCopy.reverse();
  } else {
    return goodsArrayCopy;
  }
};

export const App: React.FC = () => {
  const [sortingType, setSortingType] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleReset = () => {
    setSortingType(SortType.DEFAULT);
    setIsReversed(false);
  };

  const handleReverse = () => {
    if (isReversed === false) {
      setIsReversed(true);
    }

    if (isReversed === true) {
      setIsReversed(false);
    }
  };

  const sortedGoods = sortingGoodsFunction(goodsFromServer, {
    sortingType,
    isReversed,
  });

  const isNoSorting = sortingType === SortType.DEFAULT && isReversed === false;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortingType(SortType.ALPHABETICALLY)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortingType !== SortType.ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortingType(SortType.LENGTH)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortingType !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {!isNoSorting ? (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        <ul>
          {sortedGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
