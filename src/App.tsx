import 'bulma/css/bulma.css';
import './App.scss';
import React, { useMemo, useState } from 'react';
import cn from 'classnames';
import { SortField } from './types/SortField';
import { GoodList } from './components/GoodList';

const goodsFromServer: string[] = [
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

const getPreparedGoods = (
  goods: string[],
  sortField: SortField,
  reverse: boolean,
): string[] => {
  const sorted = [...goods];

  switch (sortField) {
    case SortField.Alphabetically:
      sorted.sort((a, b) => a.localeCompare(b));
      break;
    case SortField.ByLength:
      sorted.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  return reverse ? sorted.reverse() : sorted;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.None);
  const [reverse, setReverse] = useState(false);

  const preparedGoods = useMemo(
    () => getPreparedGoods(goodsFromServer, sortField, reverse),
    [sortField, reverse],
  );

  const reset = () => {
    setSortField(SortField.None);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortField.Alphabetically,
          })}
          onClick={() => setSortField(SortField.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortField.ByLength,
          })}
          onClick={() => setSortField(SortField.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortField !== SortField.None || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={preparedGoods} />
    </div>
  );
};
