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
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  DEFAULT = '',
}

const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false); // Стан для інверсії списку
  const [sortType, setSortType] = useState<SortType>(SortType.DEFAULT); // Стан для типу сортування

  // Отримання відсортованого списку
  const getSortedGoods = (): string[] => {
    const sortedGoods = [...goodsFromServer];

    if (sortType === SortType.ALPHABET) {
      // Використання localeCompare для точного сортування
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.LENGTH) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const sortByAlphabet = () => setSortType(SortType.ALPHABET);
  const sortByLength = () => setSortType(SortType.LENGTH);
  const reverseGoods = () => setIsReversed(prev => !prev);
  const resetGoods = () => {
    setSortType(SortType.DEFAULT);
    setIsReversed(false);
  }; // Скидає стан до початкового

  // Відсортований список
  const goods = getSortedGoods();
  const isChanged = sortType !== SortType.DEFAULT || isReversed; // Визначення, чи було змінено стан

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={sortByLength}
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

        {isChanged && (
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

export default App;
