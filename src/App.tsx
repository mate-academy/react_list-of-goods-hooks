import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

// 1. Оголошуємо масив товарів (TypeScript автоматично визначить як string[])
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

// 2. Створюємо Enum замість строкових констант
// Це дозволяє уникнути помилок при написанні назв типів сортування
export enum SortType {
  DEFAULT = '',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

// 3. Типізуємо аргументи функції
function getSortedGoods(
  sortType: SortType,
  isReversedState: boolean,
): string[] {
  // Створюємо копію масиву
  const sortedGoods = [...goodsFromServer];

  // Логіка сортування з використанням Enum
  if (sortType !== SortType.DEFAULT) {
    sortedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  // Логіка реверсу
  if (isReversedState) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  // 4. Вказуємо тип для useState, використовуючи Enum
  const [sortState, setSortState] = useState<SortType>(SortType.DEFAULT);
  const [reversedState, setReversedState] = useState<boolean>(false);

  const preparedGoods = getSortedGoods(sortState, reversedState);

  // Допоміжна функція для скидання налаштувань
  const handleReset = () => {
    setSortState(SortType.DEFAULT);
    setReversedState(false);
  };

  // Перевірка, чи потрібно показувати кнопку Reset
  const isResetVisible = sortState !== SortType.DEFAULT || reversedState;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          // Порівнюємо поточний стан з Enum
          className={`button is-info ${sortState === SortType.ALPHABET ? 'is-selected' : 'is-light'}`}
          onClick={() => setSortState(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortState === SortType.LENGTH ? 'is-selected' : 'is-light'}`}
          onClick={() => setSortState(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversedState ? 'is-selected' : 'is-light'}`}
          onClick={() => setReversedState(!reversedState)}
        >
          Reverse
        </button>

        {isResetVisible && (
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
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
