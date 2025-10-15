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
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [sortMode, setSortMode] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortGoods = (type: SortType) => {
    let sorted = [...goodsFromServer];

    switch (type) {
      case SortType.Alphabet:
        sorted.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        sorted.sort((a, b) => a.length - b.length);
        break;

      default:
        sorted = [...goodsFromServer];
    }

    if (isReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
    setSortMode(type);
  };

  const reverseGoods = () => {
    setGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  };

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setSortMode(SortType.None);
    setIsReversed(false);
  };

  const isResetVisible = goods.join() !== goodsFromServer.join();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortMode === SortType.Alphabet ? '' : 'is-light'
          }`}
          onClick={() => sortGoods(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortMode === SortType.Length ? '' : 'is-light'
          }`}
          onClick={() => sortGoods(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
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
