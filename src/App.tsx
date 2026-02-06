import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

type SortField = '' | 'alphabet' | 'length';

function getPrepearedGoods(
  goods: string[],
  sortField: SortField,
  isReverse: boolean,
) {
  let prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods = prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'length':
          return good1.length - good2.length;
        case 'alphabet':
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortField>('');
  const [statusReverse, setStatusReverse] = useState(false);
  const visibleGoods = getPrepearedGoods(
    goodsFromServer,
    sortField,
    statusReverse,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField('alphabet')}
          type="button"
          className={cn('button is-info', {
            'is-light': !(sortField === 'alphabet'),
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField('length')}
          type="button"
          className={cn('button is-success', {
            'is-light': !(sortField === 'length'),
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setStatusReverse(prev => !prev)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !statusReverse,
          })}
        >
          Reverse
        </button>

        {(sortField || statusReverse) && (
          <button
            onClick={() => {
              setSortField('');
              setStatusReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
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
