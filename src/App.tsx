import 'bulma/css/bulma.css';
import cn from 'classnames';
import { useState } from 'react';
import './App.scss';

enum SortField {
  NONE = '',
  ALPHABETICAL = 'alphabetical',
  LENGTH = 'length',
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
];

interface FilterParams {
  sortField: SortField;
  reversed: boolean;
}

function prepareGoods(goods: string[], { sortField, reversed }: FilterParams) {
  const preparedGood = [...goods];

  if (sortField) {
    preparedGood.sort((good1, good2) => {
      switch (sortField) {
        case SortField.ALPHABETICAL:
          return good1.toLowerCase().localeCompare(good2.toLowerCase());
        case SortField.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGood.reverse();
  }

  return preparedGood;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortField.NONE);
  const [reversed, setReversed] = useState(false);
  const visibleGoods = prepareGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortField.ALPHABETICAL)}
          className={cn('button is-info', {
            'is-light': sortField !== SortField.ALPHABETICAL,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortField.LENGTH)}
          className={cn('button is-success', {
            'is-light': sortField !== SortField.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            onClick={() => {
              setSortField(SortField.NONE);
              setReversed(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(goods => (
          <li key={goods} data-cy="Good">
            {goods}
          </li>
        ))}
      </ul>
    </div>
  );
};
