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
  None = '',
  Alphabeticaly = 'Alphabeticaly',
  ByLength = 'ByLength',
}

interface SortOptions {
  sortField: SortType;
}

function getPreparedGoods(
  goods: string[],
  { sortField }: SortOptions,
): string[] {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SortType.Alphabeticaly:
      return preparedGoods.sort((a, b) => a.localeCompare(b));

    case SortType.ByLength:
      return preparedGoods.sort((a, b) => a.length - b.length);

    default:
      return preparedGoods;
  }
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState(false);

  let visibleGoods = getPreparedGoods(goodsFromServer, { sortField });

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.Alphabeticaly)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabeticaly,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.ByLength)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.ByLength,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(prev => !prev)}
          className={cn('button', 'is-warning', {
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

      <ul>
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
