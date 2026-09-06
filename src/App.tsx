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

enum SortType {
  alphabetically = 'alphabetically',
  length = 'length',
  default = '',
}

function getPreparedGoods(
  goods: string[],
  {
    sortField,
    reversed,
  }: {
    sortField: SortType;
    reversed: boolean;
  },
) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabetically:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods = preparedGoods.toReversed();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.alphabetically)}
          className={cn('button is-info', {
            'is-light': sortField !== SortType.alphabetically,
          })}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          onClick={() => setSortField(SortType.length)}
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
        >
          Sort by length
        </button>
        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={cn('button is-warning', {
            'is-light': reversed === false,
          })}
        >
          Reverse
        </button>

        {(sortField !== '' || reversed !== false) && (
          <button
            type="button"
            onClick={() => {
              setSortField(SortType.default);
              setReversed(false);
            }}
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
