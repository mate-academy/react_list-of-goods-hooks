import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import classnames from 'classnames';
import { GoodList } from './GoodList';
import { Good } from './Good';

enum SortType {
  default = '',
  length = 'length',
  alphabet = 'alphabet',
}

interface FilterParams {
  sortType: SortType;
  queue: boolean;
}

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
] as const;

function sortItems(goods: Good[], { sortType, queue }: FilterParams) {
  const items = [...goods];

  if (sortType) {
    items.sort((a, b) => {
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

  if (queue) {
    items.reverse();
  }

  return items;
}

export const App: React.FC = () => {
  const [queueField, setQueueField] = useState(false); // Булеве значення
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const visibleGoods = sortItems([...goodsFromServer], {
    sortType: sortField,
    queue: queueField,
  });

  const isResetVisible = sortField || queueField;

  return (
    <div className="section content">
      <div className="buttons">
        {/* Кнопка сортування за алфавітом */}
        <button
          type="button"
          className={classnames('button', 'is-info', {
            'is-light': sortField !== SortType.alphabet,
          })}
          onClick={() => {
            setSortField(SortType.alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => {
            setSortField(SortType.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames('button', 'is-warning', {
            'is-light': !queueField, // Активний стан, якщо queueField = false
          })}
          onClick={() => setQueueField(prev => !prev)} // Інвертуємо значення
        >
          Reverse
        </button>

        {/* Кнопка Reset */}
        {isResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.default); // Скидаємо поле сортування
              setQueueField(false); // Повертаємо початковий стан
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
