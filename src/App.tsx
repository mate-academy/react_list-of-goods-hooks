import React, { useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

export const goodsFromServer: string[] = [
  'Dumplings', 'Carrot', 'Eggs', 'Ice cream', 'Apple',
  'Bread', 'Fish', 'Honey', 'Jam', 'Garlic',
];

enum SortType {
  None = '',
  Name = 'name',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState<boolean>(false);

  // Огортаємо в useMemo, щоб не перераховувати без потреби
  const visibleGoods = useMemo(() => {
    // Створюємо копію, щоб не мутувати оригінал
    const sortedGoods = [...goodsFromServer].sort((good1, good2) => {
      switch (sortField) {
        case SortType.Name:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });

    // Реверс за потреби (більш сумісний спосіб)
    return reversed ? sortedGoods.reverse() : sortedGoods;
  }, [sortField, reversed]); // Залежності: коли змінюється поле або реверс

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(prev => (prev === SortType.Name ? SortType.None : SortType.Name))}
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.Name,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(prev => (prev === SortType.Length ? SortType.None : SortType.Length))}
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(sortField !== SortType.None || reversed) && (
          <button
            type="button"
            onClick={() => {
              setSortField(SortType.None);
              setReversed(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul data-cy="GoodsList">
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
