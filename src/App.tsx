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
): string[] {
  const sortedGoods = [...goods];

  if (sortType !== SortType.Default) {
    switch (sortType) {
      case SortType.Alphabetical:
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.ByLength:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
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

  // ключевая строка — считаем список из goodsFromServer
  const preparedGoods = getPreparedGoods(goodsFromServer, sortType, isReversed);

  const showReset = isReversed || sortType !== SortType.Default;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          data-cy="sortByName"
          className={`button is-info ${sortType === SortType.Alphabetical ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          data-cy="sortByLength"
          className={`button is-success ${sortType === SortType.ByLength ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          data-cy="reverse"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            data-cy="reset"
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
