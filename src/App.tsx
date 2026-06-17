import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

//  1. Оголошуємо перелік (enum) для типів сортування.
// Це захищає нас від друкарських помилок у рядках.
enum SortType {
  Default = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

// Початковий масив товарів, який ми отримали "із сервера"
const goodsFromServer = [
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

export const App: React.FC = () => {
  //  2. Створюємо стани (useState) всередині компонента.
  // sortType зберігає поточний тип сортування (за замовчуванням — Default)
  const [sortType, setSortType] = useState<SortType>(SortType.Default);

  // goods зберігає наш поточний список товарів
  const [goods, setGoods] = useState<string[]>(goodsFromServer);

  // isReversed зберігає булеве значення: перевернутий список чи ні
  const [isReversed, setIsReversed] = useState<boolean>(false);

  //  3. Логіка обробки масиву (виконується "на льоту" при кожному рендерингі).
  // Створюємо копію масиву товарів, щоб не змінювати оригінальний стан напряму.
  const sortedGoods = [...goods];

  // Перевіряємо, чи увімкнено сортування за алфавітом
  if (sortType === SortType.Alphabet) {
    sortedGoods.sort((a, b) => a.localeCompare(b));
    // Перевіряємо, чи увімкнено сортування за довжиною слова
  } else if (sortType === SortType.Length) {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  // Після основного сортування перевіряємо, чи активовано реверс
  if (isReversed) {
    sortedGoods.reverse();
  }

  //  4. Функція для повного скидання до початкового стану
  const handleReset = () => {
    setSortType(SortType.Default);
    setGoods(goodsFromServer);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      {/* Кнопки керування списком */}
      <div className="buttons">
        {/* Кнопка алфавітного сортування */}
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        {/* Кнопка сортування за довжиною */}
        <button
          type="button"
          className={`button is-success ${sortType === SortType.Length ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        {/* Кнопка реверсу (перемикає true/false на протилежне) */}
        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {/* Кнопка Reset показується, лише якщо активоване сортування або реверс */}
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

      {/*  5. Динамічний вивід відсортованого та обробленого масиву */}
      <ul>
        {sortedGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
