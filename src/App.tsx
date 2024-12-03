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
  Default = 'default',
  Alphabetical = 'alphabetical',
  Length = 'length',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]); 
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Default);

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setIsReversed(false);
    setActiveSort(SortType.Default);
  };

  const sortAlphabetically = () => {
    setGoods(() => {
      const sortedGoods = [...goodsFromServer].sort((a, b) =>
        a.localeCompare(b),
      );

      return isReversed ? sortedGoods.reverse() : sortedGoods;
    });
    setActiveSort(SortType.Alphabetical);
  };

  const sortByLength = () => {
    setGoods(() => {
      const sortedGoods = [...goodsFromServer].sort(
        (a, b) => a.length - b.length,
      );

      return isReversed ? sortedGoods.reverse() : sortedGoods;
    });
    setActiveSort(SortType.Length);
  };

  const reverseGoods = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(prevReversed => !prevReversed);
  };

  let alphabeticalButtonClass = 'button is-info is-light';

  if (activeSort === SortType.Alphabetical) {
    alphabeticalButtonClass = 'button is-info';
  }

  let lengthButtonClass = 'button is-success is-light';

  if (activeSort === SortType.Length) {
    lengthButtonClass = 'button is-success';
  }

  let reverseButtonClass = 'button is-warning is-light';

  if (isReversed) {
    reverseButtonClass = 'button is-warning';
  }

  const resetButton =
    goods.join() !== goodsFromServer.join() ? (
      <button
        type="button"
        className="button is-danger is-light"
        onClick={resetGoods}
      >
        Reset
      </button>
    ) : null;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={alphabeticalButtonClass}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={lengthButtonClass}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverseButtonClass}
          onClick={reverseGoods}
        >
          Reverse
        </button>
        {resetButton}
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
