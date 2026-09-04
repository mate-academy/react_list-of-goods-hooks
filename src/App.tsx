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
  None = '',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const newArrOfGoods = [...goodsFromServer];

  if (sortType === SortType.Alphabet) {
    newArrOfGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortType === SortType.Length) {
    newArrOfGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    newArrOfGoods.reverse();
  }

  const handleSortByAlphabet = () => {
    setSortType(SortType.Alphabet);
  };

  const handleSortByLength = () => {
    setSortType(SortType.Length);
  };

  const handleReverseGoods = () => {
    setIsReversed(!isReversed);
  };

  const handleResetGoods = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortByAlphabet}
          className={`button is-info ${sortType === SortType.Alphabet ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortByLength}
          className={`button is-success ${sortType === SortType.Length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverseGoods}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || isReversed) && (
          <button
            type="button"
            onClick={handleResetGoods}
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {newArrOfGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
