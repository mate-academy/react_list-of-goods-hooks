import React, { useEffect, useState } from 'react';
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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleSort = (newSort: SortType) => setSortType(newSort);

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const reorderGoods = (sort: SortType, reversed: boolean) => {
    const goodsCopy = [...goodsFromServer];

    if (sort === SortType.ALPHABET) {
      goodsCopy.sort((a, b) => a.localeCompare(b));
    } else if (sort === SortType.LENGTH) {
      goodsCopy.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      goodsCopy.reverse();
    }

    setVisibleGoods(goodsCopy);
  };

  useEffect(() => {
    reorderGoods(sortType, isReversed);
  }, [sortType, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.ALPHABET ? '' : 'is-light'
          }`}
          onClick={() => handleSort(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SortType.LENGTH ? '' : 'is-light'
          }`}
          onClick={() => handleSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning  ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
