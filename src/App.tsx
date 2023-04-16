import React, { useState, useEffect } from 'react';
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
  None,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  if (sortType === SortType.None && !isReversed) {
    return goodsFromServer;
  }

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

  // eslint-disable-next-line no-console

  return isReversed ? visibleGoods.reverse() : visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.None);
  const [goods, setGoods] = useState(goodsFromServer);

  useEffect(() => {
    setGoods((prevGoods) => getReorderedGoods(prevGoods,
      { sortType, isReversed }));
  }, [sortType, isReversed]);

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.None);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.ALPHABET ? 'is-light' : ''}`}
          onClick={() => {
            setSortType(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.LENGTH ? 'is-light' : ''}`}
          onClick={() => {
            setSortType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>
        {(isReversed || sortType !== SortType.None)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => reset()}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {goods.map((item) => <li key={item} data-cy="Good">{item}</li>)}
      </ul>
    </div>
  );
};
