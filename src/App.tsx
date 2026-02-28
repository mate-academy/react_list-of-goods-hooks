import { useState } from 'react';
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
];

export enum SortType {
  Default = 'DEFAULT',
  Alphabet = 'ALPHABET',
  Length = 'LENGTH',
}

export const App = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  // 🔹 Обчислюємо масив для відображення
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

  // 🔹 Обробники
  const handleSortAlphabet = () => {
    setSortType(SortType.Alphabet);
  };

  const handleSortByLength = () => {
    setSortType(SortType.Length);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  // 🔹 Класи кнопок
  const getSortButtonClass = (type: SortType) => {
    if (sortType !== type) {
      return 'button is-light';
    }

    if (type === SortType.Alphabet) {
      return 'button is-info';
    }

    if (type === SortType.Length) {
      return 'button is-success';
    }

    return 'button is-light';
  };

  const getReverseButtonClass = () =>
    isReversed ? 'button is-warning' : 'button is-light';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getSortButtonClass(SortType.Alphabet)}
          onClick={handleSortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getSortButtonClass(SortType.Length)}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={getReverseButtonClass()}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.Default || isReversed) && (
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
