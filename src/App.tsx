import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

type Goods = string[];

interface SortParams {
  sortType: SortType;
  reverse: boolean;
}

type GetPrepearedGoods = (
  goods: Goods,
  { sortType, reverse }: SortParams,
) => Goods;

export const goodsFromServer: Goods = [
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
  Default = '',
  ByLength = 'length',
  ByAlphabet = 'alphabet',
}

const getPrepearedGoods: GetPrepearedGoods = (
  goods,
  { sortType: localSortType, reverse: localReverse },
) => {
  const prepearedGoods: Goods = [...goods];

  if (localSortType) {
    prepearedGoods.sort((good1, good2) => {
      switch (localSortType) {
        case SortType.ByLength:
          return good1.length - good2.length;

        case SortType.ByAlphabet:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });

    if (localReverse) {
      prepearedGoods.reverse();
    }

    return prepearedGoods;
  }

  if (localReverse) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sortType,
    reverse,
  });

  function handleSortByAlphabet() {
    setSortType(SortType.ByAlphabet);
  }

  function handleSortByLength() {
    setSortType(SortType.ByLength);
  }

  function toggleReverse() {
    setReverse(!reverse);
  }

  function resetList() {
    setSortType(SortType.Default);
    setReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.ByAlphabet,
          })}
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.ByLength,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverse !== true,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(!reverse && sortType === SortType.Default) === false && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
