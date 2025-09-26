import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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
  None = 'none',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState<boolean>(false);

  const handleAlphabet = () => {
    const sorted = [...goodsFromServer].sort();

    if (reversed) {
      sorted.reverse();
    }

    setGoods(sorted);
    setSortType(SortType.Alphabet);
  };

  const handleLength = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    if (reversed) {
      sorted.reverse();
    }

    setGoods(sorted);
    setSortType(SortType.Length);
  };

  const handleReverse = () => {
    setReversed(prev => !prev);

    if (sortType === SortType.Alphabet) {
      const sorted = [...goodsFromServer].sort();

      if (!reversed) {
        sorted.reverse();
      }

      setGoods(sorted);
    }

    if (sortType === SortType.Length) {
      const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

      if (!reversed) {
        sorted.reverse();
      }

      setGoods(sorted);
    }

    if (sortType === SortType.None) {
      setGoods([...goods].reverse());
    }
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setSortType(SortType.None);
    setReversed(false);
  };

  const isOriginalOrder = goods.join() === goodsFromServer.join();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={handleAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.Length ? '' : 'is-light'}`}
          onClick={handleLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={handleReverse}
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
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
