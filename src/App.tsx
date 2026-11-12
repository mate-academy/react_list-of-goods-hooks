import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

interface Good {
  id: number;
  name: string;
}

export const goodsFromServer: Good[] = [
  { id: 1, name: 'Dumplings' },
  { id: 2, name: 'Carrot' },
  { id: 3, name: 'Eggs' },
  { id: 4, name: 'Ice cream' },
  { id: 5, name: 'Apple' },
  { id: 6, name: 'Bread' },
  { id: 7, name: 'Fish' },
  { id: 8, name: 'Honey' },
  { id: 9, name: 'Jam' },
  { id: 10, name: 'Garlic' },
];

enum SortType {
  Name = 'name',
  Length = 'length',
}

export const App = () => {
  const [sortType, setSortType] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = [...goodsFromServer];

  if (sortType === SortType.Name) {
    visibleGoods.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortType === SortType.Length) {
    visibleGoods.sort((a, b) => a.name.length - b.name.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const isEqual =
    visibleGoods.length === goodsFromServer.length &&
    visibleGoods.every(
      (item, index) =>
        item.id === goodsFromServer[index].id &&
        item.name === goodsFromServer[index].name,
    );

  const reset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.Name,
          })}
          onClick={() => setSortType(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {!isEqual && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good.id} data-cy="Good">
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
