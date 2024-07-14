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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType;
  isReversed: boolean;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    default:
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

type State = {
  isReversed: boolean;
  sortType: SortType;
};

export const App: React.FC = () => {
  const [sortOptions, setSortOptions] = useState<State>({
    isReversed: false,
    sortType: SortType.NONE,
  });
  const { isReversed, sortType } = sortOptions;

  const handleClickSortType = (newType: SortType) => {
    setSortOptions(prev => ({ ...prev, sortType: newType }));
  };

  const handleClickReverse = () => {
    setSortOptions(prev => ({ ...prev, isReversed: !prev.isReversed }));
  };

  const handleClickSortDefault = () => {
    setSortOptions({
      isReversed: false,
      sortType: SortType.NONE,
    });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleClickSortType(SortType.ALPHABET)}
          className={`button is-info ${sortType !== SortType.ALPHABET && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleClickSortType(SortType.LENGTH)}
          className={`button is-success ${sortType !== SortType.LENGTH && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleClickReverse}
          className={`button is-warning ${!isReversed && 'is-light'}`}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleClickSortDefault}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {getReorderedGoods(goodsFromServer, sortOptions).map(goodie => (
            <li data-cy="Good" key={goodie}>
              {goodie}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
