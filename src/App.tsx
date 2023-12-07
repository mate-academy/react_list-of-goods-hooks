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
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sort: SortType | null;
  isReversed: boolean;
};

export const App: React.FC = () => {
  const [updatedGoods, setUpdatedGoods] = useState<string[]>(goodsFromServer);
  const [sortType, setSortType] = useState(null as SortType | null);
  const [isReverse, setIsReversed] = useState(false);

  const getReorderedGoods = ({ sort, isReversed }: ReorderOptions) => {
    let goodsCopy = [...goodsFromServer];

    switch (sort) {
      case SortType.ALPHABET:
        goodsCopy = goodsCopy.sort((a, b) => a.localeCompare(b));
        setSortType(SortType.ALPHABET);
        break;
      case SortType.LENGTH:
        goodsCopy = goodsCopy.sort((a, b) => a.length - b.length);
        setSortType(SortType.LENGTH);
        break;
      default:
        break;
    }

    if (isReversed) {
      goodsCopy.reverse();
    }

    setUpdatedGoods(goodsCopy);
  };

  const handleSortAlphabetically = () => {
    getReorderedGoods({ sort: SortType.ALPHABET, isReversed: isReverse });
  };

  const handleSortByLength = () => {
    getReorderedGoods({ sort: SortType.LENGTH, isReversed: isReverse });
  };

  const handleReverse = () => {
    setIsReversed(!isReverse);
    getReorderedGoods({ sort: sortType, isReversed: !isReverse });
  };

  const handleReset = () => {
    setSortType(null);
    setIsReversed(false);
    setUpdatedGoods(goodsFromServer);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortType === SortType.ALPHABET
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortType === SortType.LENGTH
            ? 'button is-success'
            : 'button is-success is-light'}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isReverse
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(isReverse || sortType !== null) && (
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
        {updatedGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
