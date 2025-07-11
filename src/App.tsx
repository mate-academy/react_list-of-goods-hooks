import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
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

// Видаляємо 'Reverse', оскільки це не тип сортування
export enum SortType {
  Alphabetically = 'alphabetically',
  Length = 'length',
}

export const App: React.FC = () => {
  // Стан, що зберігає вибір користувача
  const [activeSort, setActiveSort] = useState<SortType | null>(null);
  const [isReverse, setIsReverse] = useState<boolean>(false);

  // Використовуємо useMemo для обчислення відсортованого списку.
  // Цей код буде виконуватися лише тоді, коли зміниться activeSort або isReverse.
  const sortedGoods = useMemo(() => {
    // Завжди починаємо з оригінального, невідсортованого масиву
    const goodsToSort = [...goodsFromServer];

    if (!activeSort) {
      // Якщо сортування не активне, повертаємо оригінальний масив
      // (або перевернутий, якщо натиснуто Reverse без сортування)
      if (isReverse) {
        return goodsToSort.reverse();
      }

      return goodsToSort;
    }

    // Застосовуємо обраний тип сортування
    switch (activeSort) {
      case SortType.Alphabetically:
        goodsToSort.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        goodsToSort.sort((a, b) => a.length - b.length);
        break;
    }

    // Якщо прапорець isReverse встановлено, перевертаємо відсортований масив
    if (isReverse) {
      goodsToSort.reverse();
    }

    return goodsToSort;
  }, [activeSort, isReverse]);

  // Функція для повного скидання сортування
  const handleReset = () => {
    setActiveSort(null);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': activeSort !== SortType.Alphabetically,
          })}
          // Обробники кліків тепер просто змінюють стан
          onClick={() => setActiveSort(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': activeSort !== SortType.Length,
          })}
          onClick={() => setActiveSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          // Виправляємо логіку класів: кнопка активна (не світла), коли isReverse === true
          className={classNames('button', 'is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(current => !current)}
        >
          Reverse
        </button>

        {/* Кнопка Reset з'являється, якщо активний будь-який вид сортування або реверс */}
        {(activeSort || isReverse) && (
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
        {/* Відображаємо відсортований масив, обчислений в useMemo */}
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
