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
  Alphabet = 'alphabet',
  Length = 'length',
}

const getButtonClass = (
  buttonType: SortType | 'reverse',
  sortType: SortType | null,
  isReversed: boolean,
) => {
  let baseClass = 'button is-light';

  if (
    (buttonType === SortType.Alphabet && sortType === SortType.Alphabet) ||
    (buttonType === SortType.Length && sortType === SortType.Length) ||
    (buttonType === 'reverse' && isReversed)
  ) {
    baseClass = 'button is-info';
  }

  return baseClass;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = [...goodsFromServer];

  if (sortType === SortType.Alphabet) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.Length) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getButtonClass(SortType.Alphabet, sortType, isReversed)}
          onClick={() => setSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass(SortType.Length, sortType, isReversed)}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={getButtonClass('reverse', sortType, isReversed)}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortType !== null || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
