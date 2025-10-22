import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

export enum SortType {
  none = 'none',    // Добавляем значение по умолчанию
  alphabet = 'alphabet',
  length = 'length',
}

function getSortedGoods(
  listOfGoods: string[],
  sortType: SortType,  // Убираем union с пустой строкой
  reverse: boolean,
): string[] {
  const sorted = [...listOfGoods];

  if (sortType !== SortType.none) {  // Проверяем на none вместо пустой строки
    sorted.sort((a, b) => {
      switch (sortType) {
        case SortType.alphabet:
          return a.localeCompare(b);
        case SortType.length:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    sorted.reverse();
  }

  return sorted;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.none);  // Используем SortType.none
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = getSortedGoods(goodsFromServer, sortType, isReverse);

  const resetVisible = sortType !== SortType.none || isReverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          data-cy="SortAlphabetically"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.alphabet,
          })}
          onClick={() => setSortType(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          data-cy="SortByLength"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.length,
          })}
          onClick={() => setSortType(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          data-cy="Reverse"
          className={cn('button', 'is-warning', { 'is-light': !isReverse })}
          onClick={() => setIsReverse(prev => !prev)}
        >
          Reverse
        </button>

        {resetVisible && (
          <button
            type="button"
            data-cy="Reset"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.none);  // Используем SortType.none вместо пустой строки
              setIsReverse(false);
            }}
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
