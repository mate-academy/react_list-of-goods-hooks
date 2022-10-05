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
  NONE = 'none',
  ALPABET = 'alphabet',
  LENGTH = 'length',
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export const App: React.FC = () => {
  const [sortName, setSortType] = useState(SortType.NONE);
  const [reverse, setReversed] = useState(false);

  const getReorderedGoods = (
    goods: string[],
    { sortType, isReversed }: ReorderOptions,
  ) => {
    const visibleGoods = [...goods];

    visibleGoods.sort((a, b) => {
      switch (sortType) {
        case SortType.ALPABET:
          return a.localeCompare(b);
        case SortType.LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });

    if (isReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const visible = getReorderedGoods(
    goodsFromServer,
    {
      sortType: sortName,
      isReversed: reverse,
    },
  );

  const clearState = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortName !== 'alphabet' && 'is-light'}`}
          onClick={() => {
            setSortType(SortType.ALPABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortName !== 'length' && 'is-light'}`}
          onClick={() => {
            setSortType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverse && 'is-light'}`}
          onClick={() => {
            setReversed(!reverse);
          }}
        >
          Reverse
        </button>

        {(sortName !== 'none' || reverse)
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                clearState();
              }}
            >
              Reset
            </button>
          )
          : ''}
      </div>

      <ul>
        {visible.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
