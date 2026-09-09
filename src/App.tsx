import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import GoodsList from './components/GoodsList/GoodsList';

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

export enum SortType {
  Default = 'default',
  Alphabetically = 'alphabetically',
  ByLength = 'by length',
}

export function sortBy(array: string[], field: SortType) {
  const sortedArray = [...array];

  switch (field) {
    case SortType.Alphabetically:
      return sortedArray.sort((a, b) => a.localeCompare(b));
    case SortType.ByLength:
      return sortedArray.sort((a, b) => a.length - b.length);
    default:
      return sortedArray;
  }
}

export function handleReset(
  setGoodsList: React.Dispatch<React.SetStateAction<string[]>>,
) {
  setGoodsList([...goodsFromServer]);
}

export const App: React.FC = () => {
  const [goodsList, setGoodsList] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const displayedGoods = isReversed ? [...goodsList].reverse() : goodsList;

  const handleSort = (type: SortType) => {
    setGoodsList(sortBy(goodsList, type));
    setSortType(type);
  };

  const handleReverse = () => {
    setIsReversed(currentIsReversed => !currentIsReversed);
  };

  const handleResetClick = () => {
    handleReset(setGoodsList);
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSort(SortType.Alphabetically)}
          type="button"
          className={`button is-info ${sortType === SortType.Alphabetically ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSort(SortType.ByLength)}
          type="button"
          className={`button is-success ${sortType === SortType.ByLength ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {sortType !== SortType.Default || isReversed ? (
          <button
            onClick={handleResetClick}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        ) : null}
      </div>

      <GoodsList goodsList={displayedGoods} />
    </div>
  );
};
