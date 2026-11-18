import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
// const ALPHABET = 'alphabet';
// const LENGTH = 'length';

enum SortType {
  default,
 alphabet = 'alphabet',
  length = 'length',
}

type Params = {
  sortField: SortType,
  reverse: boolean,
}

const sort = (list: string[], { sortField, reverse }: Params) => {
  const preparedList = [...list].sort((good1, good2) => {
    switch (sortField) {
      case SortType.alphabet:
        return good1.localeCompare(good2);

      case SortType.length:
        return good1.length - good2.length;

      case SortType.default:
        return 0;
    }
  });

  if (reverse) {
    return preparedList.reverse();
  }

  return preparedList;
};

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const [reverse, setReverse] = useState(false);

  const preparedList = sort(goodsFromServer, { sortField, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SortType.alphabet
              ? 'button is-info'
              : 'button is-success is-light'
          }
          onClick={() => {
            setSortField(SortType.alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SortType.length
              ? 'button is-success'
              : 'button is-success is-light'  
          }
          onClick={() => {
            setSortField(SortType.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reverse === true
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {preparedList.some((good, i) => good !== goodsFromServer[i]) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortField(SortType.default);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedList.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
