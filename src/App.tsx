import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './components/GoodsList';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const goodsFromServer: string[] = [
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

enum SortBy {
  Default = 'default',
  Lenght = 'length',
  Alphabet = 'alphabrt',
}

export const App: React.FC = () => {
  const goods: string[] = [...goodsFromServer];

  const [isVisible, setVisible] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Default);

  switch (sortBy) {
    case SortBy.Lenght:
      goods.sort((product1, product2) => product1.length - product2.length);
      break;

    case SortBy.Alphabet:
      goods.sort((product1, product2) => product1.localeCompare(product2));
      break;

    default:
      break;
  }

  if (isReversed) {
    goods.reverse();
  }

  const reset = () => {
    setReversed(false);
    setSortBy(SortBy.Default);
  };

  return (
    <div className="App">
      {isVisible
        ? (
          <>
            <button
              type="button"
              onClick={() => setSortBy(SortBy.Alphabet)}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={() => setSortBy(SortBy.Lenght)}
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={() => setReversed(!isReversed)}
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={reset}
            >
              Reset
            </button>
            <GoodsList goods={goods} />
          </>
        )
        : (
          <button
            type="button"
            onClick={() => setVisible(true)}
          >
            Start
          </button>

        )}
    </div>
  );
};
