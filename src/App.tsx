import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer: string[] = [
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
  ByAlphabetically = 'alphabetically',
  ByLength = 'length',
}

const getPreparedGoods = (
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
): string[] => {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ByAlphabetically: {
          return good1.localeCompare(good2);
        }

        case SortType.ByLength: {
          return good1.length - good2.length;
        }

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.toReversed();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reversed);

  const reset = () => {
    setSortField(SortType.None);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.ByAlphabetically)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.ByAlphabetically,
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
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            onClick={reset}
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
