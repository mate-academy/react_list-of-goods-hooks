import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { useState } from 'react';
import { ComponentList } from './Components/ComponentList/ComponentList';

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
  abc = 'abc',
  length = 'length',
  reset = '',
}

function sortLogic(goods: string[], field: string, reverse: boolean) {
  let resultGoods = [...goods];

  if (field) {
    resultGoods.sort((good1, good2) => {
      switch (field) {
        case SortType.abc:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (!field) {
    resultGoods = [...goodsFromServer];
  }

  if (reverse) {
    resultGoods.reverse();
  }

  return resultGoods;
}

export const App = () => {
  const visibleGoods = [...goodsFromServer];
  const [reverse, setReverse] = useState(false);
  const [sortField, setSortField] = useState('');
  const hasResetButton = reverse || sortField;

  const handleSort = (field: string) => () => setSortField(field);
  const handleReverse = (reversed: boolean) => () => setReverse(!reversed);
  const handleReset = () => {
    setReverse(false);
    setSortField(SortType.reset);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.abc,
          })}
          onClick={handleSort(SortType.abc)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={handleSort(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
          onClick={handleReverse(reverse)}
        >
          Reverse
        </button>

        {hasResetButton
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleReset}
            >
              Reset
            </button>
          )}

      </div>

      <ComponentList goods={sortLogic(visibleGoods, sortField, reverse)} />
    </div>
  );
};
