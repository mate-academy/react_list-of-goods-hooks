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
  Alphabet,
  Length,
  Reverse,
  None,
}

function sortList(list: string[], sortFunction: SortType): string[] {
  const sortedList = [...list];

  sortedList.sort((list1, list2) => {
    switch (sortFunction) {
      case SortType.Alphabet:
        return list1.localeCompare(list2);

      case SortType.Length:
        if (list2.length === list1.length) {
          return list1.localeCompare(list2);
        }

        return list1.length - list2.length;

      default:
        return 0;
    }
  });

  return sortedList;
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortType, setSortType] = useState<SortType | null>(SortType.None);
  const [isReverse, setIsReverse] = useState(false);

  let visibleGoods = goods;

  if (isReverse) {
    visibleGoods = [...visibleGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.Alphabet ? '' : 'is-light'
          }`}
          onClick={() => {
            const sorted = sortList(goods, SortType.Alphabet);

            setGoods(sorted);
            setSortType(SortType.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.Length ? '' : 'is-light'}`}
          onClick={() => {
            const sorted = sortList(goods, SortType.Length);

            setGoods(sorted);
            setSortType(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReverse ? '' : 'is-light'}`}
          onClick={() => {
            setIsReverse(!isReverse);
          }}
        >
          Reverse
        </button>

        {(goods.join('-') !== goodsFromServer.join('-') || isReverse) && (
          <button
            type="button"
            className="button is-warning is-light"
            onClick={() => {
              setGoods(goodsFromServer);
              setSortType(SortType.None);
              setIsReverse(false);
            }}
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
