import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

interface Good {
  name: string,
  id: string,
}

const goodsFromServer: Good[] = [
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
].map(good => ({
  name: good,
  id: uuidv4(),
}));

enum SortBy {
  none,
  name,
  length,
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.none);
  const [isVisible, setVisible] = useState(false);

  const showGoods = () => {
    setVisible(true);
  };

  const getVisibilityGoods = () => {
    const copyGoods = [...goodsFromServer];

    const preperedCreater = copyGoods.sort((firstGood, secondGood) => {
      switch (sortBy) {
        case SortBy.name:
          return firstGood.name.localeCompare(secondGood.name);
        case SortBy.length:
          return firstGood.name.length - secondGood.name.length;
        default:
          return 0;
      }
    });

    if (isReversed) {
      copyGoods.reverse();
    }

    return preperedCreater;
  };

  const reverseGoods = () => {
    setReversed(current => !current);
  };

  const resetFilters = () => {
    setSortBy(SortBy.none);
    setReversed(false);
  };

  return (!isVisible
    ? (
      <button
        type="button"
        onClick={showGoods}
      >
        Start
      </button>
    )
    : (
      <>
        <h1>List of Goods</h1>
        <ul>
          {getVisibilityGoods()
            .map(good => (
              <li key={good.id}>
                {good.name}
              </li>
            ))}
        </ul>

        <button
          type="button"
          onClick={reverseGoods}
        >
          Reverse
        </button>

        <button
          onClick={() => setSortBy(SortBy.name)}
          type="button"
        >
          Sort by ABC
        </button>

        <button
          onClick={() => setSortBy(SortBy.length)}
          type="button"
        >
          Sort by Length
        </button>

        <button
          onClick={resetFilters}
          type="button"
        >
          Reset
        </button>
      </>
    )
  );
};
