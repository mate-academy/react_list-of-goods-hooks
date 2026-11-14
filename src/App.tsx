import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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
  NONE = '',
  ALPHABETICALLY = 'Sort alphabetically',
  BY_LENGTH = 'Sort by length',
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [reversed, setReversed] = useState(false);
  const sortArr = [SortType.ALPHABETICALLY, SortType.BY_LENGTH];

  let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SortType.BY_LENGTH:
        return good1.length - good2.length;
      case SortType.ALPHABETICALLY:
        return good1.localeCompare(good2);
      default:
        return 0;
    }
  });

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        {sortArr.map(field => (
          <button
            key={field}
            type="button"
            className={cn('button is-info', {
              'is-light': sortField !== field,
            })}
            onClick={() => setSortField(field)}
          >
            {field}
          </button>
        ))}

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {(sortField !== SortType.NONE || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.NONE);
              setReversed(false);
            }}
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
