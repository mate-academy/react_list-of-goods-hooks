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

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortBy, setSortBy] = useState('none');
  const [isVisible, setVisible] = useState(false);

  const visibilityApp = () => {
    setVisible(true);
  };

  const getVisibilityGoods = () => {
    const copyGoods = [...goodsFromServer];

    const preperedCreater = copyGoods.sort((firstGood, secondGood) => {
      switch (sortBy) {
        case 'name':
          return firstGood[sortBy].localeCompare(secondGood[sortBy]);
        case 'length':
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

  const sortByName = () => {
    setSortBy('name');
  };

  const sortByLength = () => {
    setSortBy('length');
  };

  const resetGoods = () => {
    setSortBy('none');
    setReversed(false);
  };

  return (!isVisible
    ? (
      <button
        type="button"
        onClick={visibilityApp}
      >
        Select
      </button>
    )
    : (
      <>
        <h1>List of Goods</h1>
        <ul>
          {getVisibilityGoods()
            .map(good => {
              return (
                <li key={good.id}>
                  {good.name}
                </li>
              );
            })}
        </ul>

        <button
          type="button"
          onClick={reverseGoods}
        >
          Reverse
        </button>

        <button
          onClick={sortByName}
          type="button"
        >
          Sort by ABC
        </button>

        <button
          onClick={sortByLength}
          type="button"
        >
          Sort by Length
        </button>

        <button
          onClick={resetGoods}
          type="button"
        >
          Reset
        </button>
      </>
    )
  );
};
