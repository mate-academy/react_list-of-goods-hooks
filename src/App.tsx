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

export enum SortType {
  None = 'none',
  Alphabet = 'alphabet',
  Length = 'length',
}

type Direction = 'asc' | 'desc' | null;

const sortAlphabetically = (items: string[], direction: Direction) => {
  const sorted = [...items].sort((a, b) => a.localeCompare(b));

  return direction === 'desc' ? sorted.reverse() : sorted;
};

const sortByLength = (items: string[], direction: Direction) => {
  const sorted = [...items].sort((a, b) => a.length - b.length);

  return direction === 'desc' ? sorted.reverse() : sorted;
};

const reverseList = (items: string[]) => [...items].reverse();

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortMode, setSortMode] = useState<SortType>(SortType.None);
  const [direction, setDirection] = useState<Direction>(null);
  const [reverseActive, setReverseActive] = useState(false);

  const updateGoods = (
    newGoods: string[],
    mode: SortType,
    dir: Direction,
    reverse: boolean,
  ) => {
    setGoods(newGoods);
    setSortMode(mode);
    setDirection(dir);
    setReverseActive(reverse);
  };

  const handleSortAlphabet = () => {
    const sorted = sortAlphabetically(goods, 'asc');

    updateGoods(sorted, SortType.Alphabet, 'asc', false);
  };

  const handleSortLength = () => {
    const sorted = sortByLength(goods, 'asc');

    updateGoods(sorted, SortType.Length, 'asc', false);
  };

  const handleReverse = () => {
    const reversed = reverseList(goods);
    const newDirection = direction === 'asc' ? 'desc' : 'asc';

    updateGoods(reversed, sortMode, newDirection, !reverseActive);
  };

  const handleReset = () => {
    updateGoods(goodsFromServer, SortType.None, null, false);
  };

  const isActive = (mode: SortType) => sortMode === mode;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${isActive(SortType.Alphabet) ? '' : ' is-light'}`}
          onClick={handleSortAlphabet}
          data-cy="sort-alphabet"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success${isActive(SortType.Length) ? '' : ' is-light'}`}
          onClick={handleSortLength}
          data-cy="sort-length"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${reverseActive ? '' : ' is-light'}`}
          onClick={handleReverse}
          data-cy="reverse"
        >
          Reverse
        </button>

        {(sortMode !== SortType.None || reverseActive) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
            data-cy="reset"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
