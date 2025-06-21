import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum Goods {
  Dumplings = 'Dumplings',
  Carrot = 'Carrot',
  Eggs = 'Eggs',
  IceCream = 'Ice cream',
  Apple = 'Apple',
  Bread = 'Bread',
  Fish = 'Fish',
  Honey = 'Honey',
  Jam = 'Jam',
  Garlic = 'Garlic',
}

enum SortAction {
  Alphabetically = 'ALPHABETICALLY',
  ByLength = 'BY_LENGTH',
}

export const goodsFromServer: Goods[] = [
  Goods.Dumplings,
  Goods.Carrot,
  Goods.Eggs,
  Goods.IceCream,
  Goods.Apple,
  Goods.Bread,
  Goods.Fish,
  Goods.Honey,
  Goods.Jam,
  Goods.Garlic,
];

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortAction | null>(null);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const getSortedGoods = (): Goods[] => {
    const result = [...goodsFromServer];

    if (sortType === SortAction.Alphabetically) {
      result.sort((a, b) => a.localeCompare(b));
    }

    if (sortType === SortAction.ByLength) {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  };

  const goods = getSortedGoods();

  const isOriginalOrder = () => !sortType && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortAction.Alphabetically ? 'is-active' : 'is-light'
          }`}
          onClick={() =>
            setSortType(
              sortType === SortAction.Alphabetically
                ? null
                : SortAction.Alphabetically,
            )
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SortAction.ByLength ? 'is-active' : 'is-light'
          }`}
          onClick={() =>
            setSortType(
              sortType === SortAction.ByLength ? null : SortAction.ByLength,
            )
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? 'is-active' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {!isOriginalOrder() && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortType(null);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
