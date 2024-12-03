import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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
  Alphabet = 'alphabet',
  Length = 'length',
  Default = '',
}

const sortGoods = (
  goods: string[],
  sortType: SortType,
  isReverse: boolean,
): string[] => {
  let sortedGoods = [...goods];

  switch (sortType) {
    case SortType.Alphabet:
      sortedGoods = sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.Length:
      sortedGoods = sortedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      sortedGoods = [...goods];
  }

  if (isReverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Default);
  const [isReverse, setIsReverse] = useState(false);

  const goods: string[] = sortGoods(goodsFromServer, activeSort, isReverse);

  const sortAlphabetically = (): void => {
    setActiveSort(SortType.Alphabet);
  };

  const sortByLength = (): void => {
    setActiveSort(SortType.Length);
  };

  const goodsReverse = (): void => {
    setIsReverse(prev => !prev);
  };

  const goodsReset = (): void => {
    setActiveSort(SortType.Default);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort === 'alphabet' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSort === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReverse === true ? '' : 'is-light'}`}
          onClick={goodsReverse}
        >
          Reverse
        </button>

        {(activeSort !== '' || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={goodsReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good, index) => (
          <li data-cy="Good" key={goods[index]}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
