import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './components/GoodList';
import { Goods } from './Goods';

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
  empty,
  length,
  alphabetically,
}

function getPreparedGoods(
  goods: Goods,
  isReversed: boolean,
  sortType: SortType,
) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((a, b) => {
      switch (sortType) {
        case SortType.alphabetically:
          return a.localeCompare(b);

        case SortType.length:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.empty);
  const [isReversed, setIsReversed] = useState(false);
  const sortedList = getPreparedGoods(
    goodsFromServer,
    isReversed,
    sortType,
  );

  const resetChanges = () => {
    setSortType(SortType.empty);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortType(SortType.alphabetically);
          }}
          type="button"
          className={`button is-info ${sortType !== SortType.alphabetically && ('is-light')}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortType(SortType.length);
          }}
          type="button"
          className={`button is-success ${sortType !== SortType.length && ('is-light')}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          type="button"
          className={`button is-warning ${!isReversed && ('is-light')}`}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            onClick={resetChanges}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={sortedList} />
    </div>
  );
};
