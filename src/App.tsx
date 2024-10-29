import React from 'react';
import cn from 'classnames';
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

enum SortBy {
  None,
  Abc,
  Length,
}

const sortGoods = (sortField: SortBy, reverseField: boolean) => {
  const sortedGoods = [...goodsFromServer];

  switch (sortField) {
    case SortBy.Abc:
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortBy.Length:
      sortedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
  }

  if (reverseField) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = React.useState(SortBy.None);
  const [reverseField, setReverseField] = React.useState(false);
  const goods: string[] = sortGoods(sortField, reverseField);

  const resetSorting = () => {
    setSortField(SortBy.None);
    setReverseField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortBy.Abc,
          })}
          onClick={() => setSortField(SortBy.Abc)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortBy.Length,
          })}
          onClick={() => setSortField(SortBy.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverseField !== true,
          })}
          onClick={() => setReverseField(!reverseField)}
        >
          Reverse
        </button>

        {(sortField !== SortBy.None || reverseField === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
