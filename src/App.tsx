import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList';

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
  Default,
  Alphabetical,
  ByLength,
}

function getPreparedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const sortedGoods = [...goods];

  if (sortType !== SortType.Default) {
    switch (sortType) {
      case SortType.Alphabetical:
        sortedGoods.sort((goodA: string, goodB: string) => {
          return goodA.localeCompare(goodB);
        });
        break;
      case SortType.ByLength:
        sortedGoods.sort((goodA: string, goodB: string) => {
          return goodA.length - goodB.length;
        });
    }
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const preparedGoods = getPreparedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.Alphabetical && 'is-light'}`}
          onClick={() => {
            setSortType(SortType.Alphabetical);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.ByLength && 'is-light'}`}
          onClick={() => {
            setSortType(SortType.ByLength);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>
        {(isReversed || sortType !== SortType.Default) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortType(SortType.Default);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={preparedGoods} />
    </div>
  );
};
