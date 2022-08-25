import React, { useState } from 'react';
import './App.css';
import { GoodList } from './components/GoodList';

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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return g1.localeCompare(g2);

      case SortType.LENGTH:
        return g1.length - g2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const goods = getReorderedGoods(goodsFromServer, sortType, reversed);

  return (
    <div className="App">
      {!started && (
        <button
          type="button"
          onClick={() => setStarted(true)}
        >
          Start
        </button>
      )}

      {started && (
        <>
          <button
            type="button"
            onClick={() => setSortType(SortType.ALPHABET)}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            onClick={() => setSortType(SortType.LENGTH)}
          >
            Sort by length
          </button>

          <button
            type="button"
            onClick={() => setReversed(!reversed)}
          >
            Reverse
          </button>

          <button
            type="button"
            onClick={() => {
              setSortType(SortType.NONE);
              setReversed(false);
            }}
          >
            Reset
          </button>

          <GoodList goods={goods} />
        </>
      )}
    </div>
  );
};
