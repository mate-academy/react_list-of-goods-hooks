import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

enum SortedType {
  sortByAlphabet = 'alphabet',
  sortByLength = 'length',
  defaultValue = '',
}

interface SortedParams {
  sortField: SortedType,
  reverse: boolean,
}

function getReadyGoods(
  goods: string[],
  { sortField, reverse }: SortedParams,
) {
  let readyGoods = [...goods];

  if (sortField) {
    readyGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortedType.sortByAlphabet:
          return good1.localeCompare(good2);
        case SortedType.sortByLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    readyGoods = readyGoods.reverse();
  }

  return readyGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortedType.defaultValue);
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getReadyGoods(goodsFromServer, { sortField, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortedType.sortByAlphabet)}
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortField !== SortedType.sortByAlphabet },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortedType.sortByLength)}
          type="button"
          className={classNames(
            'button',
            'is-sucess',
            { 'is-light': sortField !== SortedType.sortByLength },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !reverse },
          )}
        >
          Reverse
        </button>

        {(sortField.length > 0 || reverse) && (
          <button
            type="button"
            className={classNames(
              'button',
              'is-danger',
              'is-light',
            )}
            onClick={() => {
              setSortField(SortedType.defaultValue);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
