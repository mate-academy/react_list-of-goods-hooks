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
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
    case SortType.LENGTH:
      visibleGoods.sort((g1, g2) => {
        if (sortType === SortType.ALPHABET) {
          return g1.localeCompare(g2);
        }

        return g1.length - g2.length;
      });
      break;

    case SortType.NONE:
      break;

    default:
      return goods;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReversed] = useState(false);
  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              hidden={sortType === SortType.NONE && !isReversed}
              onClick={() => {
                setSortType(SortType.NONE);
                setReversed(!isReversed);
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {goods.map(item => (
          <li
            key={item}
            data-cy="Good"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
