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

enum SortType {
  SORT_ALPHABETICALLY = 'Sort alphabetically',
  SORT_LENGTH = 'Sort by length',
}

function getPreparedGoods(
  goods: string[],
  { sortField, isSortReverse }: { sortField: string; isSortReverse: boolean },
) {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField as string) {
      case SortType.SORT_ALPHABETICALLY:
        preparedGoods.sort((good1: string, good2: string) =>
          good1.localeCompare(good2),
        );
        break;

      case SortType.SORT_LENGTH:
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;

      default:
        return preparedGoods;
    }
  }

  if (isSortReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = React.useState('');
  const [isSortReverse, setIsSortReverse] = React.useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer as string[], {
    sortField,
    isSortReverse,
  });

  const resetFields = () => {
    setSortField('');
    setIsSortReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_ALPHABETICALLY,
          })}
          onClick={() => setSortField(SortType.SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.SORT_LENGTH,
          })}
          onClick={() => setSortField(SortType.SORT_LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isSortReverse,
          })}
          onClick={() => setIsSortReverse(prev => !prev)}
        >
          Reverse
        </button>
        {(sortField || isSortReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetFields}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
