import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

// ✅ Enum з дефолтним значенням
enum SortType {
  None = 'none',
  Name = 'name',
  Length = 'length',
}

interface FilterParams {
  sortField: SortType;
  reverseField: boolean;
}

// ✅ Сортування + реверс (чиста функція)
function getPreparedGoods(
  goods: string[],
  { sortField, reverseField }: FilterParams,
) {
  let preparedGoods = [...goods];

  switch (sortField) {
    case SortType.Name:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.Length:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  // ✅ Початковий стан: "none", не пустий рядок
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [reverseField, setReverseField] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverseField,
  });

  // ✅ Окремі обробники
  const handleSortByName = () => setSortField(SortType.Name);
  const handleSortByLength = () => setSortField(SortType.Length);
  const handleToggleReverse = () => setReverseField(prev => !prev);
  const handleReset = () => {
    setSortField(SortType.None);
    setReverseField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">

        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.Name,
          })}
          onClick={handleSortByName}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !reverseField,
          })}
          onClick={handleToggleReverse}
        >
          Reverse
        </button>

        {(sortField !== SortType.None || reverseField) && (
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
        {visibleGoods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
