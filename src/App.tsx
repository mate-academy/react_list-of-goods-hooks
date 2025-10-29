import React, { useState } from 'react';
import 'bulma/css/bulma.css';
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

enum SortTypeEnum {
  alphabeticallysort = 'ALPHABETICALLY_SORT',
  lengthsort = 'LENGTH_SORT',
  none = '',
}

const ALPHABETICALLY_SORT = 'alphabetically';
const LENGTH_SORT = 'length';

function getSortedGoods(
  goodsList: string[],
  sortType: SortTypeEnum,
  isReversed: boolean,
): string[] {
  const sortedGoods = [...goodsList];

  switch (sortType) {
    case SortTypeEnum.alphabeticallysort:
      sortedGoods.sort((good1: string, good2: string) =>
        good1.localeCompare(good2),
      );
      break;

    case SortTypeEnum.lengthsort:
      sortedGoods.sort(
        (good1: string, good2: string) => good1.length - good2.length,
      );
      break;

    default:
      break;
  }

  if (isReversed) {
    return sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortTypeEnum>(SortTypeEnum.none);
  const [isReversed, setReversed] = useState<boolean>(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SortTypeEnum.alphabeticallysort)}
          className={`button is-info ${!sortType.includes(ALPHABETICALLY_SORT) ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SortTypeEnum.lengthsort)}
          className={`button is-success ${!sortType.includes(LENGTH_SORT) ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(!isReversed)}
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        <button
          type="button"
          onClick={() => {
            setSortType(SortTypeEnum.none);
            setReversed(false);
          }}
          className={sortType || isReversed ? 'button is-danger is-light' : ''}
        >
          {(sortType || isReversed) && 'Reset'}
        </button>
      </div>

      <ul>
        {getSortedGoods(goodsFromServer, sortType, isReversed).map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
