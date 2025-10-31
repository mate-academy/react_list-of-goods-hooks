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
];

enum SortTypeEnum {
  alphabeticallySort = 'ALPHABETICALLY_SORT',
  lengthSort = 'LENGTH_SORT',
  None = '',
}

function getSortedGoods(
  goodsList: string[],
  sortType: SortTypeEnum,
  isReversed: boolean,
): string[] {
  const sortedGoods = [...goodsList];

  switch (sortType) {
    case SortTypeEnum.alphabeticallySort:
      sortedGoods.sort((good1: string, good2: string) =>
        good1.localeCompare(good2),
      );
      break;

    case SortTypeEnum.lengthSort:
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
  const [sortType, setSortType] = useState<SortTypeEnum>(SortTypeEnum.None);
  const [isReversed, setReversed] = useState<boolean>(false);

  return (
    <>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            onClick={() => setSortType(SortTypeEnum.alphabeticallySort)}
            className={`button is-info ${sortType !== SortTypeEnum.alphabeticallySort ? 'is-light' : ''}`}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            onClick={() => setSortType(SortTypeEnum.lengthSort)}
            className={`button is-success ${sortType !== SortTypeEnum.lengthSort ? 'is-light' : ''}`}
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
              setSortType(SortTypeEnum.None);
              setReversed(false);
            }}
            className={
              sortType || isReversed ? 'button is-danger is-light' : ''
            }
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
    </>
  );
};
