import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

export const goodsFromServer: string[] = [
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
  Default = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isDescending, setIsDescending] = useState<boolean>(false);

  const applySort = (type: SortType, descending: boolean) => {
    const sorted = [...goodsFromServer];

    if (type === SortType.Alphabet) {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (type === SortType.Length) {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (descending) {
      sorted.reverse();
    }

    setGoods(sorted);
  };

  const handleAlphabetSort = () => {
    setSortType(SortType.Alphabet);
    setIsDescending(false);
    applySort(SortType.Alphabet, false);
  };

  const handleLengthSort = () => {
    setSortType(SortType.Length);
    setIsDescending(false);
    applySort(SortType.Length, false);
  };

  const handleReverse = () => {
    const newIsDescending = !isDescending;

    if (sortType !== SortType.Default) {
      setIsDescending(newIsDescending);
      applySort(sortType, newIsDescending);
    } else {
      setGoods([...goods].reverse());
    }
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setSortType(SortType.Default);
    setIsDescending(false);
  };

  const isOriginalOrder =
    JSON.stringify(goods) === JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={handleAlphabetSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.Length ? '' : 'is-light'}`}
          onClick={handleLengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortType !== SortType.Default ? '' : 'is-light'}`}
          onClick={handleReverse}
          disabled={sortType === SortType.Default}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
