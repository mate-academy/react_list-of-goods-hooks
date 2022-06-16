import React, { useState } from 'react';
import './App.css';

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
  default,
  name,
  length,
}

export const App: React.FC = () => {
  let goods = [...goodsFromServer];

  const [isVisible, setIsVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [isSortedBy, setIsSortedBy] = useState(SortBy.default);

  switch (isSortedBy) {
    case SortBy.name:
      goods.sort((g1, g2) => (g1.localeCompare(g2)));
      break;

    case SortBy.length:
      goods.sort((g1, g2) => (g1.length - g2.length));
      break;

    default:
      goods = [...goods];
  }

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div>
      <div>
        <h1>Goods</h1>
        {!isVisible && (
          <button
            type="button"
            onClick={() => setIsVisible(true)}
          >
            Start
          </button>
        )}
      </div>

      {isVisible && (
        <div>
          <button
            type="button"
            onClick={() => setIsReversed(!isReversed)}
          >
            Reverse
          </button>

          <button
            type="button"
            onClick={() => setIsSortedBy(SortBy.name)}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            onClick={() => {
              setIsReversed(false);
              setIsSortedBy(SortBy.default);
            }}
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => setIsSortedBy(SortBy.length)}
          >
            Sort by length
          </button>
        </div>
      )}

      <div>
        {isVisible && (
          <ul>
            {goods.map((good) => (
              <li key={good}>
                {good}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
