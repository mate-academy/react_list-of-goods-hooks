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
  ALPHABETICALLY = 'Sort alphabetically',
  LENGTH = 'Sort by length',
  NONE = '',
}

function getVisibleGoods(
  goods: string[],
  sortField: SortType,
  reverseField: boolean,
): string[] {
  const visibleGoods = [...goods];

  if (sortField !== SortType.NONE) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getVisibleGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );

  const reset = () => {
    setSortField(SortType.NONE);
    setReverseField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.ALPHABETICALLY)}
          type="button"
          className={cn(['button', 'is-info'], {
            'is-light': sortField !== SortType.ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.LENGTH)}
          type="button"
          className={cn(['button', 'is-success'], {
            'is-light': sortField !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseField(!reverseField)}
          type="button"
          className={cn(['button', 'is-warning'], {
            'is-light': !reverseField,
          })}
        >
          Reverse
        </button>

        {(sortField !== SortType.NONE || reverseField) && (
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
